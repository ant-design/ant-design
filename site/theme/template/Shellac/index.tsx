import * as React from 'react';
import Footer from '../../../../components/footer';
import Layout from '../../../../components/layout';
import { generateCSS } from '../../../../shellac/generateCSS';
import logo from '../../../../components/logos/logo-ai2-white-withText-micro.svg';

interface BishengMarkdownContent {
  content: string[][];
}

interface Props {
  data: { shellac: { template: () => Promise<BishengMarkdownContent> } };
}

export default class Shellac extends React.PureComponent<Props> {
  previewRef: React.RefObject<HTMLIFrameElement>;

  constructor(props: Props) {
    super(props);
    this.previewRef = React.createRef();
  }

  componentDidMount() {
    this.props.data.shellac.template().then(tmpl => {
      // HACK (codeviking): This data is provided by `bisheng`. That tool will load Markdown files
      // only (I tried pointing it at HTML). To workaround this we embed the template in a single
      // code block in a markdown file. Here we pick out the contents of the resulting `<code />`
      // tag from what looks like a parsed representation of the Markdown document that's provided
      // by `bisheng`. It's a little weird, but it works!
      let html = tmpl.content[1][2][1];

      // Inject the CSS and AI2 logo.
      html = html.replace('{css}', `<style>${generateCSS()}</style>`).replace('{logo}', logo);

      // We write the HTML into an `<iframe />` so the styles don't collide with those of
      // the demo application.
      if (this.previewRef.current === null || this.previewRef.current.contentDocument === null) {
        console.error('No <iframe /> to write content to.');
        return;
      }
      this.previewRef.current.contentDocument.write(html);
    });
  }

  render() {
    return (
      <Layout>
        <Layout.Content>
          <div className="shellac-intro-copy">
            <h2>
              <span role="img" aria-label="nail polish">
                💅
              </span>{' '}
              Shellac
            </h2>
            <p>
              Shellac is a pared down version of Varnish that lets you make a polished, AI2 branded
              website with HTML alone.
            </p>
            <p>
              You should use Shellac for building simple, static sites. If your application is
              likely to be complex and include a lot of interactivity, use Varnish proper instead.
            </p>
            <h3>Usage</h3>
            <p>To use Shellac just download the template and start writing HTML:</p>
            <div className="code-box">
              <div className="highlight">
                <pre>
                  <code>wget https://cdn.jsdelivr.net/npm/@allenai/varnish/dist/shellac.html</code>
                </pre>
              </div>
            </div>
            <h3>Preview</h3>
            <p>Here’s a preview of what things end up looking like:</p>
          </div>
          <div className="shellac-preview">
            <div className="code-box">
              <div className="code-box-demo">
                <iframe frameBorder="0" title="Shellac Preview" ref={this.previewRef} />
              </div>
            </div>
          </div>
        </Layout.Content>
        <Footer />
      </Layout>
    );
  }
}
