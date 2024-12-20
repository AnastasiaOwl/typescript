//1. Implement the built-in Pick<T, K> generic without using it.
//Constructs a type by picking the set of properties K from T

// interface Todo {
//     title: string;
//     description: string;
//     completed: boolean;
//   }
  
//   type MyPick<T, K extends keyof T> = {
//     [key in K]: T[key];
//   };
  
//   type TodoPreview = MyPick<Todo, 'title' | 'completed'>;
  
//   const todo: TodoPreview = {
//     title: 'Clean room',
//     completed: false,
//   };

//   type TodoPrev = MyPick<Todo, 'title'>;

//   const todo2: TodoPrev = {
//     title: 'go shopping'
//   }
  
//   console.log(todo);
//   console.log(todo2);

//2. Implement the built-in Readonly<T> generic without using it.
//Constructs a type with all properties of T set to readonly, meaning the properties of the constructed type cannot be reassigned.
  
// interface Todo {
//   title: string
//   description: string
// }

// type MyReadonly<T> = {
//   readonly [P in keyof T] : T[P];
// };

// const todo: MyReadonly<Todo> = {
//   title: "Hey",
//   description: "foobar"
// }

// todo.title = "Hello" // Error: cannot reassign a readonly property
// todo.description = "barFoo"

// 3. Given an array, transform it into an object type and the key/value must be in the provided array.

// const tuple = ['tesla', 'model 3', 'model X', 'model Y'] as const

// type TupleToObject<T extends readonly PropertyKey[]>={
//   [K in T[number]]: K;
// };

// type result = TupleToObject<typeof tuple> // expected { 'tesla': 'tesla', 'model 3': 'model 3', 'model X': 'model X', 'model Y': 'model Y'}

// 4. Implement a generic First<T> that takes an Array T and returns its first element's type.

// type arr1 = ['a', 'b', 'c']
// type arr2 = [3, 2, 1]

// type First<T extends any[]> = T extends [] ? never : T[0];


// type head1 = First<arr1> // expected to be 'a'
// type head2 = First<arr2> // expected to be 3

// 5. For given a tuple, you need create a generic Length, pick the length of the tuple

// type tesla = ['tesla', 'model 3', 'model X', 'model Y']
// type spaceX = ['FALCON 9', 'FALCON HEAVY', 'DRAGON', 'STARSHIP', 'HUMAN SPACEFLIGHT']

// type Length<T extends readonly any[]> = T["length"];

// type teslaLength = Length<tesla>  // expected 4
// type spaceXLength = Length<spaceX> // expected 5

// 6. Implement the built-in Exclude<T, U>

// type MyExclude<T, U> = T extends U ? never : T;

// type Result = MyExclude<'a' | 'b' | 'c', 'a'> // 'b' | 'c'

// 7. If we have a type which is a wrapped type like Promise, how can we get the type which is inside the wrapped type?
// For example: if we have Promise<ExampleType> how to get ExampleType?

// type ExampleType = Promise<string>

// type MyAwaited<T> = T extends Promise<infer k> ? MyAwaited<k> : T;

// type Result = MyAwaited<ExampleType> // string

// 8. Implement the util type If<C, T, F> which accepts condition C, a truthy value T, and a falsy value F. C is expected to be either true or false while T and F can be any type.

// type If<C extends boolean, T, F>= C extends boolean ? C extends true ? T : F : never;

// type A = If<true, 'a', 'b'>  // expected to be 'a'
// type B = If<false, 'a', 'b'> // expected to be 'b'

// 9. Implement the JavaScript Array.concat function in the type system. 
//A type takes the two arguments. The output should be a new array that includes inputs in ltr order

// type Concat<A extends any[], B extends any[]> = [...A,...B];

// type Result = Concat<[1], [2]> // expected to be [1, 2]

// 10. Implement the JavaScript Array.includes function in the type system. 
//A type takes the two arguments. The output should be a boolean true or false.

// type Includes<T extends readonly any[], U> = U extends T[number] ? true : false;

// type isPillarMen = Includes<['Kars', 'Esidisi', 'Wamuu', 'Santana'], 'Dio'> // expected to be `false`

// type isPillarMen2 = Includes<['Kars', 'Esidisi', 'Wamuu', 'Santana'], 'Kars'> 

// 11. Implement the generic version of Array.push

// type Push<T extends unknown[], U> = [...T, U];

// type Result = Push<[1, 2], '3'> // [1, 2, '3']

//12. Implement the type version of Array.unshift

// type Unshift<T extends unknown[], U> = [U, ...T];

// type Result = Unshift<[1, 2], 0> // [0, 1, 2]

//13. Implement the built-in Parameters generic without using it.

// const foo = (arg1: string, arg2: number): void => {}

// type MyParameters<T> = T extends (...args: infer P) => any ? P : never;

// type FunctionParamsType = MyParameters<typeof foo> // [arg1: string, arg2: number]

//14. Implement the built-in ReturnType<T> generic without using it.

// const fn = (v: boolean) => {
//     if (v)
//       return 1
//     else
//       return 2
//   }

//   type MyReturnType<T extends (...args:any[]) => unknown> = T extends (...args: any) => infer R ? R : never;
  
//   type a = MyReturnType<typeof fn> // should be "1 | 2"

// 15. Implement the built-in Omit<T, K> generic without using it.
// Constructs a type by picking all properties from T and then removing K

// interface Todo {
//     title: string
//     description: string
//     completed: boolean
//   }

//   type MyOmit<T extends object, K extends keyof T> = {
//     [P in Exclude<keyof T, K>] : T[P];
//   }
  
//   type TodoPreview = MyOmit<Todo, 'description' | 'title'>
  
//   const todo: TodoPreview = {
//     completed: false,
//   }

//16. Implement a generic MyReadonly2<T, K> which takes two type argument T and K.
// K specify the set of properties of T that should set to Readonly.
// When K is not provided, it should make all properties readonly just like the normal Readonly<T>.

// interface Todo {
//     title: string
//     description: string
//     completed: boolean
//   }

//   type MyReadonly2<T, K extends keyof T = keyof T> =  T & { // K iterates throught all T properties and add (keyof T) as a default value if K null
//     readonly [P in K] : T[P];                // readonly for all properties K & (add left properties as they are to T) T
//   }

//   const todo: MyReadonly2<Todo, 'title' | 'description'> = {
//     title: "Hey",
//     description: "foobar",
//     completed: false,
//   }
  
//   todo.title = "Hello" // Error: cannot reassign a readonly property
//   todo.description = "barFoo" // Error: cannot reassign a readonly property
//   todo.completed = true // OK

// 17. Implement a generic DeepReadonly<T> which make every parameter of an object - and its sub-objects recursively - readonly.
// You can assume that we are only dealing with Objects in this challenge.
//  Arrays, Functions, Classes and so on do not need to be taken into consideration. 
// However, you can still challenge yourself by covering as many different cases as possible.

// type X = { 
//   x: { 
//     a: 1
//     b: 'hi'
//   }
//   y: 'hey'
// }

// type Expected = { 
//   readonly x: { 
//     readonly a: 1
//     readonly b: 'hi'
//   }
//   readonly y: 'hey' 
// }

// type DeepReadonly<T> = keyof T extends never ? T : {
//    readonly [P in keyof T] : DeepReadonly<T[P]>;
//   }

// type Todo = DeepReadonly<X> // should be same as `Expected`

// 18. Implement a generic TupleToUnion<T> which covers the values of a tuple to its values union.

// type Arr = ['1', '2', '3']

// type TupleToUnion<T extends unknown[]>= T[number];

// type Test = TupleToUnion<Arr> // expected to be '1' | '2' | '3'

// 19. Chainable options are commonly used in Javascript. But when we switch to TypeScript, can you properly type it?
//In this challenge, you need to type an object or a class - whatever you like - to provide two function option(key, value) and get().
// In option, you can extend the current config type by the given key and value. We should about to access the final result via get.

// type Chainable<T={}>={
//     option<K extends string, U>(
//         key: K extends keyof T ? never : K,
//         value:U):
//         Chainable<T & Record<K, U>>;
//     get:()=>T;
// };


// declare const config: Chainable

// const result = config
//   .option('foo', 123)
//   .option('name', 'type-challenges')
//   .option('bar', { value: 'Hello World' })
//   .get()

// // expect the type of result to be:
// interface Result {
//   foo: number
//   name: string
//   bar: {
//     value: string
//   }
// }

//20 Implement a generic Last<T> that takes an Array T and returns its last element.

// type arr1 = ['a', 'b', 'c']
// type arr2 = [3, 2, 1]

// type Last<T extends unknown[]>= T["length"] extends 0 ? never : 
// [never,...T][T["length"]]; // [never,...T][T["length"]] додає never як перший елемент масиву, тоді повертає елемент із індексом рівному довжині T

// type tail1 = Last<arr1> // expected to be 'c'
// type tail2 = Last<arr2> // expected to be 1

// 21. Implement a generic Pop<T> that takes an Array T and returns an Array without it's last element.

// type arr1 = ['a', 'b', 'c', 'd']
// type arr2 = [3, 2, 1]

// type Pop<T extends unknown[]> = T extends [...infer Rest, any] ? Rest : never;

// type re1 = Pop<arr1> // expected to be ['a', 'b', 'c']
// type re2 = Pop<arr2> // expected to be [3, 2]

// 22. Type the function PromiseAll that accepts an array of PromiseLike objects, 
// the returning value should be Promise<T> where T is the resolved result array.

// const promise1 = Promise.resolve(3);
// const promise2 = 42;
// const promise3 = new Promise<string>((resolve, reject) => {
//   setTimeout(resolve, 100, 'foo');
// });

// type Awaited<T> = T extends PromiseLike<infer U> ? U : T; //If T is a PromiseLike, extract its resolved type as U.

// declare function PromiseAll<T extends readonly any[]>(
//   values: T
// ): Promise<{ [P in keyof T]: Awaited<T[P]> }>; // { [P in keyof T]: Awaited<T[P]> } iterates over each element in the tuple T.

// //The return type is a Promise that resolves to a tuple where each element is the resolved value of the corresponding input.

// // expected to be `Promise<[number, 42, string]>`
// const p = PromiseAll([promise1, promise2, promise3] as const)

// 23. In this challenge, we would like to get the corresponding type by searching for the common type field in the union Cat | Dog. 
// In other words, we will expect to get Dog for LookUp<Dog | Cat, 'dog'> and Cat for LookUp<Dog | Cat, 'cat'> in the following example.

// interface Cat {
//     type: 'cat'
//     breeds: 'Abyssinian' | 'Shorthair' | 'Curl' | 'Bengal'
//   }
  
//   interface Dog {
//     type: 'dog'
//     breeds: 'Hound' | 'Brittany' | 'Bulldog' | 'Boxer'
//     color: 'brown' | 'white' | 'black'
//   }
  
//   type LookUp<T, U extends string>=  T extends {
//     type: U 
//   } ? T : never;

//   type MyDogType = LookUp<Cat | Dog, 'dog'> // expected to be `Dog`

// 24. Implement TrimLeft<T> which takes an exact string type and returns a new string with the whitespace beginning removed.

// type TrimLeft<T extends string>= T extends `${" " | "\n" | "\t"}${infer Rest}` ? TrimLeft<Rest> : T;

// type trimed = TrimLeft<'  Hello World  '> // expected to be 'Hello World  '

//25. Implement Trim<T> which takes an exact string type and returns a new string with the whitespace from both ends removed.

// type Trim<T extends string> = T extends `${" " | "\n" | "\t"}${infer Rest}${" " | "\n" | "\t"}` ? Trim<Rest> : T;

// type trimmed = Trim<'  Hello World  '> // expected to be 'Hello World'

//26. Implement Capitalize<T> which converts the first letter of a string to uppercase and leave the rest as-is.

// type Capitalize<T extends string> = T extends `${infer U}${infer Rest}` ? `${Uppercase<U>}${Rest}` : T;

// type capitalized = Capitalize<'Hello world'> // expected to be 'Hello world'

//27. Implement Replace<S, From, To> which replace the string From with To once in the given string S

// type Replace<T extends string, F extends string, U extends string>= T extends `${infer Start}${F}${infer Rest}` ? `${Start}${U}${Rest}` :T;

// type replaced = Replace<'types are fun!', 'fun', 'awesome'> // expected to be 'types are awesome!'

// 28. Implement ReplaceAll<S, From, To> which replace the all the substring From with To in the given string S

// type ReplaceAll<T extends string, F extends string, U extends string> = 
//   F extends '' 
//     ? T 
//     : T extends `${infer Start}${F}${infer Rest}` 
//       ? `${Start}${U}${ReplaceAll<Rest, F, U>}` 
//       : T;


// type replaced = ReplaceAll<'t y p e s', ' ', ''> // expected to be 'types'

//29. For given function type Fn, and any type A (any in this context means we don't restrict the type, and I don't have in mind any type 😉)
//  create a generic type which will take Fn as the first argument, A as the second, 
// and will produce function type G which will be the same as Fn but with appended argument A as a last one.

// type Fn = (a: number, b: string) => number

// type AppendArgument<F,A>= F extends (...args: infer Args)=> infer ReturnType ?
// (...args: [...Args , A])=> ReturnType : never;

// type Result = AppendArgument<Fn, boolean> 
// expected be (a: number, b: string, x: boolean) => number

//30. Implement permutation type that transforms union types into the array that includes permutations of unions.

type Permutation<T, U = T> = [T] extends [never]
  ? []
  : T extends U
  ? [T, ...Permutation<Exclude<U, T>>]
  : never;


type perm = Permutation<'A' | 'B' | 'C'>; // ['A', 'B', 'C'] | ['A', 'C', 'B'] | ['B', 'A', 'C'] | ['B', 'C', 'A'] | ['C', 'A', 'B'] | ['C', 'B', 'A']