# Create a umi project

# clean up
rm -rf ~tmpProj/

# clone project
git clone https://github.com/ant-design/ant-design-examples.git ~tmpProj --depth=1

# change directory
cd ~tmpProj/examples/with-nextjs-inline-style

# install dependencies
yarn

# build
yarn run build
