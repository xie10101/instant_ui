//替换数字 执行 ;


function test(s)
{
    // 转换为数组 ：
    let arr = s.split("");
    for (let key of arr) {
        // NaN不会直接视作false 但在一些 需要布尔值的上下文中会被隐式转换为false
        if (Number(key)) {
            arr[arr.indexOf(key)]="number"
         }
    }
    return arr.join("");
}

console.log(test("123aa67890"))