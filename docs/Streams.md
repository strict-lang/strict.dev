---
id: Streams
title: Streams
sidebar_label: Streams
---

Streams (also called [pipelines or pipes from the functional world](https://martinfowler.com/articles/collection-pipeline/)) help us to process data in an easy way and also handles asyncronly nicely for us. It lets the caller decide what to do and gives the implementation the flexibility to go over the data in various forms. Programming streams is a bit different from sequential or procedual programming and needs some time to get used to. In functional languages it often simplifies problems a lot.

![Async flow](https://mdn.mozillademos.org/files/15911/promises.png)

# Haskell

```haskell
import Control.Monad (unless)
import Pipes
import System.IO (isEOF)

--         +--------+-- A 'Producer' that yields 'String's
--         |        |
--         |        |      +-- Every monad transformer has a base monad.
--         |        |      |   This time the base monad is 'IO'.
--         |        |      |  
--         |        |      |  +-- Every monadic action has a return value.
--         |        |      |  |   This action returns '()' when finished
--         v        v      v  v
stdinLn :: Producer String IO ()
stdinLn = do
    eof <- lift isEOF        -- 'lift' an 'IO' action from the base monad
    unless eof $ do
        str <- lift getLine
        yield str            -- 'yield' the 'String'
        stdinLn              -- Loop
```

Here a standard input *producer* gives us data, which is passed along into the code below it. When eof is reached, the pipe stops, otherwise it goes on and grabs *str* from the current line input, yields it out as string and recursively loops.

Here is another example from the Haskell pipes tutorial passing data from a Producer *a* through an effect *m* and returning the result *r*.
```haskell
for :: Monad m => Producer a m r -> (a -> Effect m ()) -> Effect m r
```

# JavaScript

Here is an example from the JavaScript world:
```js
// Fetch the original image
fetch('./tortoise.png')
// Retrieve its body as ReadableStream
.then(response => response.body)
.then(body => {
  const reader = body.getReader();
  ...
})
```

Here we grab an image over http and then get the body inside of the response, which is a ReadableStream we can then pass into the next *then* call, which gets the reader and so on (the .body.getReader is syncronous and doesn't need to be done this way, but you get the idea you can pass things along and you don't have to wait for each call to complete).

If you want to return the whole thing you get a Promise object and not the original http fetch request or the body or reader or whatever else is at the end of your stream pipe. The promise object needs to be awaited at the caller in the same manner (via *.then* or using *await*).

# F#

```fs
let finalSeq = 
    seq { 0..10 }
    |> Seq.filter (fun c -> (c % 2) = 0)
    |> Seq.map ((*) 2)
    |> Seq.map (sprintf "The value is %i.")
```

F# is very similar to C# and shows how to write functional code in the .NET world nicely. It also matches what we want to do in Strict except of the seq and |> keyword.

This code creates a sequence of 10 numbers (from 0 to 10, which is Range(0, 10) in Strict), then passed it through 3 pipes and returns the result all the way up to the original *finalSeq* definition. The first pipe does filters out uneven numbers, the next one multiplies each number by two and the final one converts each filtered and modified number to a string.

# Strict

Streams are used in Strict via the simple stream keyword, which does all of the above automatically, there is nothing else needed. Just keep in mind that every line that follows stream is operating on that stream and types often change along the way. The editor will tell you which type is used on each line and keep your Auto Complete clever and easy to use. Its probably easier to just write this code than to explain it or read it without an editor at hand:

```ocaml
PipeFSharpExample
  test is ("value=0", "value=1", "value=2")
  return stream number from Range(0, 3)
    number % 2
    number * 2
    "value=" + number
```

The method will return a *Sequence* of strings (the Editor will show you that always) and you can see it anyways from the test in the first line. The stream is constructed on the Range 0, 1, 2 and number is used in the first line of the pipe (at any point you can create new types and whatever is returned is used downwards, simple things like filters are done via booleans and any operator on an existing type will return the type again).

Pretty selfexplanatory for now. This is not implemented in the [sdk](https://github.com/strict-lang/sdk) yet and this documentation needs to be updated one that is done.

# References

https://hackage.haskell.org/package/pipes-4.3.13/docs/Pipes-Tutorial.html

https://developer.mozilla.org/en-US/docs/Web/API/Streams_API

https://developer.mozilla.org/en-US/docs/Web/API/Streams_API/Using_readable_streams

https://riptutorial.com/fsharp/example/14158/pipe-forward-and-backward