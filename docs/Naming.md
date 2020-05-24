---
id: Naming
title: Naming
---

Naming is hard. Most don't like to think long about clever names for types, folders, methods. At least for products, packages or projects most of us really think long on a clever name.

What usually happens is some kind of copy+paste from some existing project architecture or existing design pattern.
- Code goes here (e.g. /src or /src/company/project/package/)
- Docs belong in /docs), database schema is in /db, external libraries go into /lib, etc.
- Inside of each of those there are many more existing naming rules or we just use what already exists (e.g. naming from external libraries, documentation tools, scripts)

Uncle Bob shows this point in his great [Architecture: The Lost Years talk](https://www.youtube.com/watch?v=HhNIttd87xs&t=1402).

The code itself is also often structured in the same way based on a design pattern (like MVC)
- models
- controllers
- views
- utils
- helpers
- managers

This doesn't tell us anything about the app, we now would have to dig deeper and figure out what this is even about. Maybe a useful project name or a good documentation helps, but digging into the code or even working on it, isn't much fun, most of these kinds of project have horrible code bases and rarely live on for multiple years.

As stated in the [Coding Style](/CodingStyle) all of these names are forbidden in Strict and we also do not want folder, packages or type names like these anywhere. Name everything in a way that is decoupled and makes sense when looking at it from close and afar. Good examples can be found from [ServiceStack](https://servicestack.net/): [Live Demos](https://github.com/NetCoreApps/LiveDemos)

It is fine to name things the same over and over again and reuse the same namespace namings like: /entities, /services, /interactors, /adapters, /requests, /responses, especially if this is coming from a framework or design pattern. However we try to avoid appending those common names to everything, the same way we don't want to name each variable and member with the type it is using:
- Don't use *m_iCount*, it is horrible to read, use *count*
- Don't use *AccountInterface* or *IAccount*, just use *Account*
- Don't use *AccountService* or *AccountStorage*, just use *Accounts*
- Don't use *MoveMotorRequest* or "MotorPositionResponse*, just use *MoveMotor* in /requests and *MotorPosition* in /responses

The IDE will tell you all the information all the time anyway and the compiler and AST knows all this information anyway, no need to type all those extra letters, especially if it is done over and over again, keep it short and simple!