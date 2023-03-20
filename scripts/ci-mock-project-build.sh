# Create a umi project

# clean up
rm -rf ~tmpProj/

# clone project
git clone https://github.com/ant-design/create-next-app-antd.git ~tmpProj --depth=1

# install
cd ~tmpProj
yarn

# build
yarn run build