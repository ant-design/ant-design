# Create a umi project

# clean up
rm -rf ~tmpProj/

# clone project
git clone https://github.com/ant-design/ant-design-pro.git ~tmpProj --depth=1

# install
cd ~tmpProj
tnpm i

# build
npm run build