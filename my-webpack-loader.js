module.exports = function myWebpackLoader(content) {
    console.log(content.replace("console.log(", "alert("));
    return content.replace("console.log(", "alert(");
}