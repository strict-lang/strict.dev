---
title: September 2022 Details about Mutability in Strict
author: Murali Tandabany
---

In Strict programming language, every member or variable is immutable by default. i.e. value can be only assigned during member/variable initialization. Thus, any has or let is constant by default. Strict also supports Mutable types so that member/variable values can be changed after initialization as well. This can be achieved by explicitly specifying the type as Mutable during initialization or if the type implements Mutable trait.

## How to define Mutable types?

There are three ways to define Mutable types.
	1. Explicitly mention the type as Mutable during member/variable assignment. 
	```
	has counter = Mutable(0)
	let counter = Mutable(0) //now counter variable is mutable and its value can be changed
	for Range(0, 5)
		counter = counter + 1
	```
	2. Use the types that implements Mutable as your member/variable type.
	```
	has counter = Count(0) //here Count is the type that implements Mutable in their class implementation
	let counter = Count(0)
	```
	3. Directly use the type which implements Mutable trait in their class
	```
	has count //here count is the type that implements Mutable 
	```

All of the above three ways does the same operation and enable mutability to member/variable in strict.
	
## Immutable Types Cannot Be Reassigned

Parser always checks the type of the member/variable before reassigning value to it. When any immutable type values are reassigned in strict program, parser will throw ImmutableTypesCannotBeReassigned exception.

```
has number 
Run
  number = number + 5 -> this will cause ImmutableTypesCannotBeReassigned error, so we MUST use Mutable types when we want to change values
```
