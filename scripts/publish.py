#!/usr/bin/env python3

import subprocess
import os
import argparse
import json
import shutil

def rename_module(content: str, new_name="@allenai/varnish") -> str:
    parsed = json.loads(content)
    assert parsed["name"] == "antd"
    parsed["name"] = new_name
    return json.dumps(parsed, indent=2)

if __name__ == "__main__":
    parser = argparse.ArgumentParser(prog="release.py", description="A utility for releasing the " +
                                                                    "@allenai/varnish library.")
    parser.add_argument("--dry-run", action="store_true", help="If specified nothing will be published.")
    parser.add_argument("--skip-check-commit", action="store_true",
                        help="If specified the the `check-commit` step is skipped")
    parser.add_argument("--skip-tests", action="store_true", help="If specified tests are skipped.")
    parser.add_argument("--pack", action="store_true", help="If specified an archive is prepared " +
                                                            "instead of publishing to a remote " +
                                                            "repository.")

    args = parser.parse_args()

    root = os.path.join(os.path.dirname(__file__), os.path.pardir)

    # The order of these commands was derived from the original `pre-publish` script and
    # the order here: https://github.com/ant-design/antd-tools/blob/master/lib/gulpfile.js#L387
    # There's a few things we omit `check-git` and `package-diff` as AFAICT they're duplicative
    # of `check-commit`.
    cmds = [ "check-commit", "test-all", "version", "compile", "dist" ]
    if args.skip_check_commit:
        cmds = [ c for c in cmds if c != "check-commit" ]
    if args.skip_tests:
        cmds = [ c for c in cmds if c != "test-all" ]

    for cmd in cmds:
        subprocess.check_call([ "npm", "run", cmd ], cwd=root)

    # HACK (codeviking):
    # We have to leave the module name unmodified, otherwise `antd`'s build tools fail for
    # opaque reasons. To work around this we modify the name just before publishing the module.
    with open(os.path.join(root, "package.json"), "r+", encoding="utf-8") as pkg:
        with open(os.path.join(root, "package-lock.json"), "r+", encoding="utf-8") as lock:
            orig_pkg_content = pkg.read()
            orig_lock_content = lock.read()

            # Change the name in both
            pkg.seek(0)
            pkg.write(rename_module(orig_pkg_content))
            pkg.truncate()

            lock.seek(0)
            lock.write(rename_module(orig_lock_content))
            lock.truncate()

            # We also need to modify the name of the artifacts in dist.
            for filename in os.listdir(os.path.join(root, "dist")):
                if not filename.startswith("antd"):
                    continue
                antd_name = os.path.join(root, "dist", filename)
                varnish_name = os.path.join(root, "dist", f"varnish{filename.lstrip('antd')}")
                shutil.move(antd_name, varnish_name)
                print(f"renamed {os.path.relpath(antd_name, os.getcwd())} -> " +
                      f"{os.path.relpath(varnish_name, os.getcwd())}")

            if args.pack:
                subprocess.check_call([ "npm", "pack" ])
            else:
                # Publish to NPM
                subprocess.check_call([ "npm", "publish", "--dry-run" if args.dry_run else None ])

            # Revert the name change
            pkg.seek(0)
            pkg.write(orig_pkg_content)
            pkg.truncate()

            lock.seek(0)
            lock.write(orig_lock_content)
            lock.truncate()

