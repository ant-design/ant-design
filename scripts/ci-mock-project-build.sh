# Create a umi project

# clean up
rm -rf ~tmpProj/

# clean up `packageManager` since this will block yarn install
echo "Cleaning up package.json..."
sed -i '/packageManager/d' 'package.json' # linux no need for `''`
sed -i '' '/packageManager/d' 'package.json' # mac need `''`

# clone project
echo "Cloning project..."
git clone https://github.com/ant-design/ant-design-examples.git ~tmpProj --depth=1

# change directory
echo "Changing directory..."
cd ~tmpProj/examples/with-nextjs-inline-style

# install dependencies
echo "Installing dependencies..."
yarn

# build
echo "Building..."
yarn run build
