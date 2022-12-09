---
id: EverythingNeededForKata
title: Everything you need for the Weekly Kata
---

# Installation

1. Use Visual Studio Code
2. Click Extensions tab on Left Navigation bar (L=last one in the list)
3. Click ... menu above Search placeholder and click Install from VSIX
4. Download Strict extension using this link https://drive.google.com/file/d/1CEFDCB3OIEDEJOV8vfz2ErXxVBZZthKy/view?usp=share_link and use the vsix file
5. Create a new folder and name it as "Kata" (like namespace in CSharp)
6. Create a new file and name it as "ClassNameForKata.strict" (use best suitable class name for the Kata)
7. Clone Strict repository into your machine
  Github - https://github.com/strict-lang/Strict
  Clone Folder Path - C:\code\GitHub\strict-lang\Strict
8. Open Strict.sln in Visual Studio Run Strict.LanguageServer 
9. Start coding in Strict using below language guidelines

# How to Run Strict

As of now, executing the whole type is not implemented so we have to execute only the methods using command pallete.

1. Press Ctrl + Shift + P to open command palette
2. Click Run Strict option
3. Type the test method call expression with type name and press enter. For example, FileName.MethodName(testArguments,..) OR FileName(constructorArgument1,..).MethodName(testArguments,..)
4. Output can be viewed in the Output tab (Terminal) and select Strict in the Tasks dropdown

# Package

The folder that contains .strict extension files are created as a package in Strict. For example, if your folder name is Kata, then the strict package name is Kata which has all of the types present in the folder. By default this Kata package will be stored as a sub package under Base package so that all your custom types can access the base package types easily.

# Base Types

 Basically, everything in Strict is a type. For example, Number, Text, Boolean etc. are already present in the base package and avaialble all the time. By just using the type name anywhere in your program, it can be inferred automatically based on the usage and either gets an instance of the type or use it as a type definition.

Example:

ArithmeticOperation.strict
```
has number //--> This will create a Number instance automatically (mostly use the same Number instance everytime as everything is immutable by default)
// OR alternatively
has memberName Number // --> This is manually declaring the type of the member
```

# Custom Types

In strict, every new file with .strict extension creates a new type with program present in the file similar to a class in C# language. You can use all the existing types such as base package types and example package types in your program all the time. The type name is same as the file name. Type can contain members and methods.

# Enum

Type with only members will be treated as Enum in Strict. Refer Enum https://strict.dev/docs/Types#enum

# Members

Members in strict are like the properties of a class in C# language. You can define a private or public member based on the requirement of the type. The syntax to define a member is as follows

```
has memberName TypeName
//OR
has typeName //--> member with name typeName will be created and automatically finds the type without defintion
```

Example
```
has input Number
//OR
has number
```
Each type should have atleast one memeber otherwise the type will be treated as a trait which similar to an interface in C#.

# Methods

Always after members, methods should be declared. Syntax for the method definition is as follows,

```
has memberName
MethodName(optionalParam1 Param1Type,..) MethodReturnType  // Brackets should not be used for parameter less method defintion
	test expression 1 // atleast one test expression should be added for each method
	method body line1 // method body should start with a tab in the beginning
	method body line2
	returnExpression // return keyword is not needed if the last expression is the return expression
```

Example
```
Floor(input Number) Number
	Floor(1) is 1
	Floor(2.4) is 2
	value - value % 1
```

To know the methods avaialble in base types, open a base strict file and then you can see all of the available methods and the method definition. Visual studio code does show these details with autocomplete feature.

# Test expressions

Each method should have at least one test expression otherwise it won't be allowed for parsing. To write a test expression, follow the below syntax,

```
TypeName.MethodName(testArguments,..)
OR
TypeName(constructorArgument1,..).MethodName(testArguments,..)
```

Here type name is the file name where the program is written. 

# Constructor

All members which are not initialized in the type are constructor arguments. When a type instance is created, those constructor arguments should be passed otherwise the parser will throw error.

Example:
ReverseList.strict
```
has elements List
Reverse List
	ReverseList(1, 2, 3, 4).Reverse is (4, 3, 2, 1) // Here (1, 2, 3, 4) is a constructor argument and will be used to initialize elements member during ReverseList type instance creation
	ReverseList("A", "B", "C", "D").Reverse is ("D", "C", "B", "A")
	ReverseList(true, false).Reverse is (false, true)
	return for Range(elements.Length - 1, 0)
		elements(index)
```

# If Else

IfElse works the similar way as any other programming language and the syntax is as follows,

```
if condition
	then expression		// should start with a tab in the beginning and can be multiline
	return expression	// return keyword should be used here for method return expression
else								// else block is optional
	optional else block expression
```

Example

```
if value is "("
	parentheses.Increment
else if value is ")"
	parentheses = parentheses - 1
else if parentheses is 0
	result = result + value
```

# For Loop

Refer For loop in this document https://strict.dev/docs/For#for

# List

List data structure in strict can contain multiple elements of same type and the syntax for a list is as follows,

```
(element1, element2, element3,..)
```
Round brackets should be used in the beginning and end of the list; elements should be separated by a comma followed by space character.

Example:
```
(1, 2, 3, 4, 5)
("Hi", "Hello")
(true, true, false, false, true)
```

List uses Generics and any type ends with an 's' character will be automatically inferred as List of that type. For example, Numbers automatically means List of Number, similarly Texts, Booleans creates their own List implementation with that type.

# Assignment

You can do assignments to either a member of a method variable. The syntax for both are as follows,

For member assignment

```
has memberName = Assignment expression
```

Example
```
has inputList = (1, 2, 3)
has input = 5
```

For method variable assignment

```
constant variableName = Assignment expression
```

Example
```
constant input = (1, 2, 3)
```

Members or variables declared as constant are always immutable and cannot be changed. 

# Mutability

Members or variables defined using constant keyword are always immutable. In fact, everything in Strict is immutable unless it is declared as Mutable using below syntax,

Note - This is not working yet but will be made soon this week. Until that use alternative syntax
```
mutable memberName = Assignment expression
mutable variableName = Assignment expression
```

Example:
```
mutable result = Numbers // this assigns a mutable empty list expression of type number to the member result
mutable counter = 0 // this assigns a mutable number expression with value 0 to the variable counter
```

Current working synatx to declare assignments

```
constant variableName = Mutable(expression)
constant variableName = Mutable(TypeName) // this is used to instantiate expression of the mentioned type with empty value
```

# Range

Range works similar to C# Range type. Start and End value should be passed to the constructor of Range during instance creation. This can be used for repeated iterations in the loop. Refer Range.strict in base folder for more details about Range. Syntax to create Range is as follows,

```
Range(startNumber, endNumber)
```

Example
```
Range(0, 10)
```

