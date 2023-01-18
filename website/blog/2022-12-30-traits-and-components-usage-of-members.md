---
title: December 2022 Traits and Components
author: Murali Tandabany
---

In this blog, we are going to discuss about how we can use a strict type as a trait or as a component in any other type. We will also discuss the differences between these two usages.

After we removed the `implement` keyword and overloaded that behavior to `has` keyword, we need a new way to identify whether the type used as a member is intended as a trait or a component at the parser level. For example, see the below code snippet. 

```
CustomApp.strict

has App
has file
...
```

Type CustomApp has two members `App` and `file` and both types are traits(no implementation provided for the methods). Out of these two, we cannot infer that `App` type is used as a trait and this program type should implement the Run method from the `App` type. Also, `file` type is a component to this type and all the public methods and members of the `file` type will be used in this program.

## Trait

In order to differentiate these two type usages, we have come up with a new rule and this also helps the parser to treat the types as per the intended usage. The new rule is if all of the member type methods are implemented in the current type, then it means that member type is used as a trait.

Example program for member used as a Trait

```
ConsoleApp.strict

has App
has log
Run
	log.Write(6)
```

In this example, `Run` method of the type `App` member is implemented in the ConsoleApp.strict. With this, compiler now can automatically interpret `App` member is used as a trait.

## Component

On the other side, if no methods of the member are implemented in the current type, then it is automatically interpreted that member type will be a component to this current type and all of it's methods are available for the usage. One more syntax that denotes  that the type is used as a component is initializing the member with the constructor parameters. In these cases, compiler will allow the program to get parsed without errors and let the runtime figure out which instance type should be injected as a dependency for this component type member.

Example program for member used as a Component

```
TextContentPublisher.strict

has File = "test.txt"
ReadAndPublish Text
	Publish(File.Read())
```

In this example, `File` member methods are not implemented rather `Read` method is used inside ReadAndPublish method. Therefore, it is clear now that `File` member is used as a component in TextContentPublisher type.

## Usage Not Allowed

One case which is not allowed in this rule is partially implementing the member type methods. This will create confusion in deciding the member usage, hence it is not allowed and the parser will throw an exception to ask the user to implement missing methods of the member type. The below example program demonstrates this invalid case.


```
CsvFile.strict

has File
Read Text
	constant openedFile = FileStream.OpenFile
	return openedFile
```

In this example, CsvFile type implemented Read method but missed to implement Lenght, Write and Delete methods. Therefore, this is not allowed and the compiler will throw an exception in this case.