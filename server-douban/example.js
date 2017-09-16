// js 对象简易深拷贝
var obj = {
	name: 'tom',
	age: 18,
	data: {
		sex: '男',
		dog: 'jim'
	}
}

var str = JSON.stringify(obj)
var obj1 = JSON.parse(str)

console.log(obj1)
console.log(obj === obj1)
console.log(obj.data === obj1.data)