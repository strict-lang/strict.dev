---
id: Types
title: Types
sidebar_label: Types
---

Please see [Keywords](/docs/Keywords) for current up to date information about keywords and base types available.

# Custom Types

Everything in Strict should use custom reusable types if there is any unit or measurement involved, here is a great talk from Bjarne Stroustrup about using a unit type system (in C++ at compile time, ignore that). Plain numbers are only used in methods for low level calculations and once a type has a build in type member, it is not allowed to have anything else. This means you cannot simply create a type with number age, string name, string city, number zip, even though Strict would know from the names where age or zip is also used and get some context out of that. Instead you will have to create new types for things like Age, Person, City, Address, etc. and then use those types in a composed type that tries to describe a person or user. Yes, that is more work, but it is needed to help Strict understand the purpose of each member and allow easy refactoring, type checking, constraints, etc. The same applies for method parameters, always pass in custom type, build in types like in some early examples will not compile, Strict needs to understand what you are passing into each method.

Also remember that any type just containing a number and even things composed of numbers can use any method involving numbers and calculations. Those operations will return the appropriate type (adding two Age members will result in an Age again, using Age \* Time will fail if there is no Type found that combines Age and Time).

Bad examples (won't compile, Strict does not understand it if more than 2 base types are used. always define the meaning):

```
BadCode/person.type
number age
text name
number zip
text city
BadCode/book.type
text name
text author
number pages
```

Better examples

```
Common/person.type (Note: this works because types are automatically found that have the name of the member)

name
age
city
Common/name.type (again, text is used implicitly here, only one use, using it anywhere works like a text)
text

Common/firstAndLastName.type (two different Name members are used here, they have to be named)

name first
name last
Common/age.type (just an implicit number would be possible, but years describes it much better when expressing Age, since there is still a number underneath mathematical operations can be performed, but they will still return another Age)
number years

Common/city.type (bunch of other types used, can be more simple or more complex depending on the use case, there might be many different kinds of City types throughout the code and we need to map those later when trying to reuse data)

name
location
list(Person) citizens
```

# Build-In Types

As described in Overview there is no need to declare any type "const" to make it constant. Since all members in types or methods are immutable, any member that has a fixed value assigned to it (any number, bool or string) will automatically become a constant value that cannot be changed. You also cannot assign a different value to any already created member, it always has to go by a different name (unlike JavaScript where you never know in which scope some variable was declared). There are a few exceptions to this, for example the for loop works with an iterator that changes each time the for loop goes to the next item, but you cannot declare the iterator type or assign anything to it, it is just the way for loops work (each iteration uses its own constant value). Similarly list and map types can be redirected to a new instance (see below) to make changes to a list. The original list or map however stays the same and other threads will only know when accessing again.
number (internally a double, like in Lua): Any float, double, long, dword, int, byte, uint, short, ushort, etc. will become a number, which is always used in the same manner. Code also gets more explicit in case you want to round things to the nearest whole number. Sometimes you might want to save memory in big arrays or if you really need a specific number type like a short array (for indices passed to a GPU) to be passed into a third party library you can still use the .NET type (like list(System.Int16) in this case), see IntVsDouble performance test to see that the difference is less than 10% in debug and even in worst case scenarios (5x slower doubles in release mode) not worth to use int or long as soon as you do something more than just adding in your loops. Check these links.

```
x = 5
value = 1.2
big = 3e20
rounded = System.Math().Round(5 / 3)
text is any text, empty, one character or more and works very much like strings in most high level languages (C#, Lua, Java, all Utf8, immutable, thread safe, like all of our build in types)
hiText = "Hi there"
empty = ""
composedText = "This is " + city + " with " + citizens + " citizens."
bool is the boolean value true or false, no other value is allowed. Many operators like is and comparisons (>, <, >=, or their method names: greater, smaller, greaterOrEqual, etc.) return booleans. Tests use booleans to determinate if a method works (if not the code and values is outputted and helps fixing the problem, probably LightTable style)
isValid = list != empty
result = 2 != 0
isEven = value % 2 == 0
```

list is any array or list and gets an extra parameter for the type of the list (like generics in C#), here is an important read on not using arrays for passing data around. Vector, list, array, sets, queue, stack, etc. all become simple lists (check this for the huge amount of collections in .NET, very similar in other languages, also see this great talk from Bjarne Stroustrup Vector vs Linked Lists, always use array data for performance). Lists should also be used for returning multiple elements or using pairs or more complex simple structures. Lists and maps must always be fully specified, you cannot just have a type "list" like "number", it always must be a list of type, e.g.

```
 list(number), list(string), list(bool)
values = 1, 2, 3 // in C# you would write List<int>, here it is an implicit System.Console.WriteLine(list(number))
for each value in values
  System.Console.WriteLine(value)
nodes = Node.create(), Node.create()
combined = values + nodes // this is a list(anything) (in C# List<object>) and can hold anything, the results of adding two lists is their lowest common type -> This is not supported anymore
```

map is a dictionary structure with key and value. value can be anything like for list, key however must be a number or a string (all methods are optimized for those, sorting and access is much faster this way)! It is needed much less than all of the types above, but still very important in some cases. Think of it as a table with the key as the line number and the value as all the other values (usually just one, but can be a list). Internally works like a Dictionary in .NET (hashtable, unique keys, using hash comparisons for good performance). Other languages have tons of collection and map types (boost, clojure, C#, Java), but it turns out that aside from lists and maps the other collection types are rarely used and can mostly be emulated with list and map here. If you are not happy, feel free to import external types and use them. Iterating through maps is only possible by their keys like for lists, but instead of returning key value pairs like in other languages you just get a key (same behavior as a list again) and can use it to access the value of the map via the Get method. This makes the code much clearer, maybe a bit more verbose, but it allows easier optimization and refactoring. Also keep in mind that higher language constructs like Linq are not possible in Strict and you always need to have low level code or call helpful methods to do compositions. Again this keeps things simple and understandable.

```
numberNames = (1, "one"), (2, "two"), (3, "three") // type is map[numbers,string]
nodesMap = ("first", Node.create()), ("second", Node.create()) // map[string,node]
nodesMap = nodesMap.Add("third", Node.create()) // reassignment is allowed to add new element
```

That's it, there is only 5 base types and you can pretty much do 99% of the things with them already and code on top of them. All these types and the base types are available in the Base.Scope, every other scope is a children of this always available Base.Context (that is actually the way you can access it in C#: Base.Number, Base.Text, Base.Bool, Base.Context).

# Creating Types

Creating types is highly encouraged. Pretty much all data should describe itself. Just having a bunch of numbers and strings is not going to help Strict understand what each type is for. The member names will help a bit, but even better is to have a lot of tiny types, each for its own purpose. Types are quickly defined and can be extended easily. As long as you don't have many methods calling its members you can also change the member names many times, to be safe the IDE always does refactor name for each member name change. Changing constant values is totally safe as the type is the only place where they are defined. Each type must be defined in a subdirectory of the current Strict executable folder, which is used for the namespace. Namespaces are also scopes and created automatically for each folder (namespace) and each method in that folder (which can access all types located in that folder and above folders with short names, all other types have to be fully specified).

```
user.type

id
static idCounter = 0
name
email
calculator.type

Pi = 3.1415926
PiTimesTwo = 6.2831852
vector2D.type

number x
number y
```

# Base Types

Obviously you are allowed to import other types (like external or specific types like float or short), but these do not benefit from the Strict language features (they all are treated as they type they are). Here are additional types used internally:

anything is the "base type" for all types (including the build in types listed here), but it can never be assigned. See below for polymorphism, there is no OOP in Strict. You always need to assign some real data to it (a number, string, bool, list, map or any imported or created type). All types can be mapped to anything (like C#, this is System.Object). Mostly used if you don't know the type when writing some code and figure it out later, should rarely be used or needed, but might be useful to show intent that a method can be used by any type (obviously object does not implement anything, thus you can only do simple things like adding, comparing, iterating (for list of anything) and that is probably it).
void is the empty data type, nothing is returned, nothing is used, this can never be returned or assigned and never be used for member declarations or arguments, only for methods that are not supposed to return anything.
Any other type is either imported (e.g. from .NET like System.Console like in many examples above) or created by the user (each code file is one type with the name of the file). For simplicity we will just import types from .NET for now, but it is certainly possible to use Java (JVM), script languages or native data structures in the future and even abstract some common things away (if it makes sense and there is use for it).
All types have a ton of information connected to them, which makes finding their users easy and provide us with many refactoring options and restructuring code automatically. It also leads to a better understanding of each type, where it is used and what it is used for, which helps Strict to understand why each type is important.

# Creating Type Instances

Creating type instances is done via <Type>(<optional arguments>). If you are not in the namespace and have not imported a namespace (only in collapsed mode) with the fully qualified name: <Namespace>.<Type>(<optional arguments>). You do not have to write the create constructor, both creating a new empty instance via <Type>() and an instance and filling the type members can be called without having to write any code for it, but all arguments have to be explained and match, e.g. vector2D(x = 1, y = 5). A create method can also be written, which then behaves like any other method in addition to creating the type (e.g. create(number,number)vector2D.method).

```
numberValue = 5
numberFromExpression = 3 + 5 * numberValue
listOfNumbers = 1, 2, 3, 4, 5
nameOfNumbers = (1, "One"), (2, "Two"), (3, "Three")
point = Vector2D(x = 2, y = 2)
```

Idea: Creating Types and Getting types is actually the same since they are immutable. This means creating the same Vector2D 10 times will just return the same instance over and over, it is unchangeable anyway. It also will affect other types that might store a another type, it cannot be changed, a complete new instance has to be created.

It is also possible to get existing instances via the same logic (before was an extra get method). It is easily possible in Strict because all type instances are immutable and can be shared by any caller, thread or method safely. From the example above you can get the already created vector2D via: vector2D(x = 1, y = 5), this will return the same thing over and over again. Numbers, bools, strings, lists and maps can all only be initialized with values, you cannot create new ones, overwrite their create or get methods or find them somehow (because the only input you could give them would fully describe them anyways). Custom create methods are only useful for composed types.

```
unitX = vector2D(x = 1, y = 0)
unitY = vector2D(x = 0, y = 1)
defaultNode = node()
```

# D, Go and Lua

No matter which cool new language comes out, they all have some really great ideas missing in most other languages, that was the point when the new language was created. For example D greatly improves C++ code by using auto and inferring types for you from the most common statically typed type. This is not different in Strict, the template system and "auto" is similar to Strict, but maybe a bit more flexible when writing as Strict likes to change types automatically when things get more general.

After learning a bit of Go and reading through its website and wiki page, it seems it also follows quite a few same initial ideas, but goes way in a different direction. But there are still good key learning's we either already apply or can learn from:
No type inheritance, our no OOP idea is very similar, we just also omit the interfaces (they are automatically created)
No method overloading is also very similar to our methods, which work with any type implementing the same methods
No generic programming again is very similar, we still have kind of generics in lists and maps, but those are explicit
No pointers, no assertions, etc. are all similar too, but we go way farther (Go is more close to C, especially the output)
Initialization through type inference is a good idea, should be picked up and makes the collapsed code short and easy
Fast compilation times does not apply to Strict, everything is always compiled and writing code obviously has to be fast (otherwise writing it would not be fun or even possible for Strict itself). Still "Go provides a model for software construction that makes dependency analysis easy and avoids much of the overhead of C-style include files and libraries." That is the main reason of fast compilation.
Remote package management has to be thought of, a nuget way would be good, but with real source code instead!
goroutines and channels are a powerful mechanism, internally Strict needs similar features, just not clear if the language should expose it like Go to help writing code and using concurrency at the correct spot instead of automatically. Currently we should avoid it and just let the strict language handle these things, only add if really necessary. The syntax for those is a pretty nice idea (much shorter and precise than async and await from C#)
No exception handling, everything always returns stuff, there is only a rarely used panic/recover system.
Strict types are very similar to Lua and this makes working with it very easy and you don't have to think about the internal representation of the build in simple types. It is easy to convert from C# types to Strict types, but the other way around requires analysing all its users (and should not be done, always think of Strict types as what they are, not how you would do it in other programming languages). Many typical types from C#, Java, C++, Python, Clojure, etc. are represented by one of the following few types. More control is possible by using an external type (used very rarely).
Null
It is important to note that nothing can ever have the value null (or nil), everything always needs to be set once a member is created. Same is true for types, all of its internal members must be valid when the type is created. Usually to mark something as empty, an empty list is returned, which works well when working with lists (or collections in general, also includes map). For all other types there is a Default Object (often called Null Object), which is used to indicate there is no useful data to return. For numbers this is 0, for strings it is the empty string (""), bool is false by default, and all other types have an empty representation, which is all of its members having the default object value (e.g. a Vector3D Default Object is using 3 numbers for X, Y and Z, which all default to 0 on their own). You can also explicitly ask for this default object via <Type>(), which invokes the get operator method without any condition and will return the first object found (which is the default object). This technique is also used when accessing static classes from .NET, which you cannot create or access any way.

Since the build in types are used extremely often they are not tracked (but still there in the type system, we just do not count every UsedBy list, still the methods are available)

# Names

Unlike all other programming languages member and method names are very important in Strict to help it understand what is done by the code. Strict is case sensitive, Types must be start with an uppercase letter (only the build in types are lower case), type members, methods (including the build-in operators) and local members are written in lowercase letters. Go uses lower case member names to indicate they are private in the package, this might be a useful idea later, but this is not planned for Strict right now. You can easily spot outside .NET calls as their members (properties) and methods are usually written with a upper case first letter. Some methods like System.Math().Round are just called for laziness and might later be replaced with actual rounding code so Strict understand what this method does. In any case conflicts between uppercase or lowercase wording can never exist in Strict as names always have to be written the same way. The IDE might help by changing wrongly written identifiers automatically since there is only one right way.

Uppercase (very rarely used, contexts are known by just being in the right folder, outside calls are rare too)

Contexts (Basics, Tests, etc.)
Calls to the outside (e.g. .NET methods or Win32 methods, e.g. System.Console.WriteLine("hey"))
Lowercase (everything else)

Methods (both build in methods and operators like add, is, and, or and custom methods like length())
Members in types or methods (number x, string text)
Keywords in collapsed mode (if, for, etc. in expanded mode these are actual statements, but also written in lowercase)
Types (like user.type, vector2D.type, etc. including build in types: number, bool, string, list, map, void, anything)
Constants in types or methods (pi = 3.141529) are no different from any other member, thus not treated differently
Words are automatically split from the name (each upper case starts a new word), this helps Strict to understands what each word means and in which context it is used (isEven becomes "is" and "even"). In expanded mode all names are split like that and actually stored with spaces between the words. In collapsed mode they fall back to the camel case with the rules described above, uppercase first letter for types, constructors, namespaces and constants, everything else starts with a lowercase letter. Names that describe the behavior should be used and the same naming as in types should be used. If a member is just named x, y, a, i or value Strict assumes it is just used for number crunching and math (context is important) and will try to understand it from the context (those things should not be strings). Like always in good code naming of methods is even more important and really should describe what they do. Only this way Strict can learn and understand more and more about what it is doing.

As you have seen from the examples above type definitions are composed in the same manner as member and method names, here are some examples:

```
numberNames = (1, "one") // type is map[number,string], read as map numbers to strings, in C# you would write Dictionary<int, string> for this

isEven = value % 2 == 0 // isEven can be used for any number and checks from now on, this is how you would define a new feature

// Refactoring (after even checks are detected multiple times) will turn that into
method isEven(value) // this becomes a file: isEven.value.method, value is implicitly a number, the return value is implicitly bool
  isEven(1) is false
  isEven(2) is true
  isEven(842) is true
  return value % 2 == 0
```

Not only do you have to write out the names for list and map types in this manner, you can also specify "generic" types for other things in this fashion like "entities(Drawable)", which only would accept drawable entities. You can also filter things by just assigning general instances to more specific instances like "list(Drawable) drawables = entities". From the example above you can also see that "isEven" is not just a good name for the member, but also leads to refactorings where even checks are at other places in the code and provides the IsEven method, which can be called at all such places. Strict will from now on understand that "is even" means "value modulated by 2 should be 0" and from the test cases he knows some examples as well.

Maybe later or in higher level constructs: Names can be multiple words separated by spaces even in collapsed mode, so the user just writes english sentences. Each word in a name can also have links to the meaning where it is used otherwise, like "greater or equal" knows that "greater" and "equal" are also methods, which are used here and the "or" describes how they are connected (as a binary expression), thus Strict understands that this is a composite and can deduct greater or smaller automatically :) Thinking a bit more about this would also lead to better understanding singular and plural words, number is a single number, while numbers is a list of numbers, same with string and strings, etc. This would make the code shorter and give additional meaning to using plurals in the language (like in English, when there is a difference between book and books).

# Type Related Statements

For more details see Statements

## Type

- Namespace (directory this type is located in), namespaces are scopes (with sub namespaces and methods scopes in them)
- Name (file name in the Namespace, Namespace+Name must be unique)
- BasedOn (base type, always must be set, except for object)
- Members (all fields in this class type, for enums all values, assignment is always done in constructor)
- Methods (all available methods, including all overrides, which are not saved out if empty)
- Constructors (easy access to the constructors method from Methods list, can be empty, for enums contains the initialization)
- UsedByMembers (list of members using this type, does not include statements)
- UsedByMethods (list of methods using this type as a return type or parameter type, or in fact if any of the statements in a method uses this type, methods can be referenced by many different types, thus methods also know all types using them)
- UsedByStatements (all places in code where this type is used, members or methods, e.g. "<Type> newType" defines a new type, "newType = <Type>.create(1, 2, 3)" creates this type)
  There are no modifiers on types (or members or methods), if at safe time we want to make things internal, private, protected, etc. we can find out who needs access and save appropriately.
- Bunch of static types can also be easily accessed via FrameworkType, e.g. FrameworkType.Void, FrameworkType.Int, FrameworkType.Float, FrameworkType.String, etc.

## Member

- Parent (Type we are contained in, always must be valid)
- Type (of this field)
- Name (short name always, must be unique for this type, no .,;:[]()/\ allowed)
- IsStatic (usually false, but sometimes we want static singleton fields)
- UsedByStatements (all places in code where this member is used, if all statements are inside the current class type, we can make the member private when saving it, or protected if only used by this and derived types)
- UsedByTypes (links back to all the types using this method, this is important for splitting up methods in case of member names changing in one type, while another type needs the unchanged member name of this method)

## Methods

- Parent (Type we are contained in, always must be valid)
- ReturnType (what does this method return, often just System.Void)
- Name (short name always, must be unique for this type, rename is required if multiple overloads are used (otherwise we cannot access a method via DynamicObject as we cannot be sure if there is other variants), no .,;:[]()/\ allowed)
- Arguments (list of arguments this method accepts, each one has a type and name)
- BasedOn (if set we are overriding a method from the base type of this class type)
- IsStatic (not set, but instead determinated automatically by checking if this method uses any non-static member of this type and if BasedOn is not used)
- All methods can be public, private, protected or internal and is converted back to the appropriate visibility when writing out the code (e.g. protected if used in derived classes)
- Statements (list of all statements made in this method, statements are usually nested)
- IsAbstract (get only, returns true if there are no statements)

## Operators

- are just build in methods (starting with a lower case letter, e.g. create, add, etc.)
- details can be found on the Statements page
