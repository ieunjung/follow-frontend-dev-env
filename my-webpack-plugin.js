class MyWebpackPlugin {
    apply(compiler) {
        // 플러그인이 종료되면 실행된다
        // compiler.hooks.done.tap("My Plugin", stats => {
        //     console.log("MyPlugin: done")
        // })

        // 플러그인 후처리한다
        compiler.hooks.emit.tapAsync('FileListPlugin', (compilation, callback) => {
            // Create a header string for the generated file:
            var filelist = 'In this build:\n\n';
            for (var filename in compilation.assets) {
                filelist += '- ' + filename + '\n';
            }

            const source = compilation.assets["main.js"].source();
            const banner = [
                '/**',
                ' * 이것은 BannerPlugin이 처리한 결과입니다.',
                ' * Build Date: 2021-02-03',
                ' */'
            ].join('\n');

            // Insert this list into the webpack build as a new file asset:
            compilation.assets['filelist.md'] = {
                source: function() {
                  return filelist;
                },
                size: function() {
                  return filelist.length;
                }
              };

            compilation.assets['main.js'] = {
                source: function () {
                    return banner + '\n' + source;
                }
            };

            callback();
        });
    }
}

module.exports = MyWebpackPlugin;