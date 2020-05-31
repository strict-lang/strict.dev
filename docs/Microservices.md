---
id: Microservices
title: Microservices
---

Strict tries to keep things small, everything starts with a few types and the very first method you write of a new package must start with a unit test. This naturally leads to small units of functioning work.

You could still mess up and have too many or too deep dependencies creating a spagetti mess of dependencies, like the monolithic mega patterns of having the UI - Buisness Logic - Database all calling each other and growing to crazy huge sizes for long running projects:
![alt text](https://www.inflectra.com/GraphicsViewer.aspx?url=Rapise/Highlights/api-testing.xml&name=wordml://03000001.png "UI - Business Logic - Database")

Strict enforces to keep each package small, have the least amount of dependencies and be highly reusable, which is a more work some of the time. Thanks to enforcing reuse if the compiler detects you write code that already exists, many things will also become easier and you will discover a fully working algorithm instead of reinventing it many times. Most importantly we don't want to a big clump of monolithic code that becomes unmanage and very likely is hard to impossible to reuse.
![alt text](https://docs.oracle.com/en/solutions/learn-architect-microservice/img/monolithic_vs_microservice.png "Microservice vs Monolithic")

# Small is beautiful

The [unix philosophy](https://en.wikipedia.org/wiki/Unix_philosophy) has been around for more than 4 decades and clearly states the idea of keeping things small, only do one thing and work well together. This works pretty good in a command line environment, where programs can pass their output to the next program. In the UI world there is no equivalent (so fallback to command line tools is often used), but there are great solutions in the web world where a lot of it is driven by web services/api/wsdl/soap/rest/rpc/etc. The great thing about web services is that they do not care from what you call them, it can be any OS, programming language or any place as long as the web service is reachable:
![alt text](https://res.cloudinary.com/practicaldev/image/fetch/s--YH0uorRI--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/i/c6q0vsbz6zrqawkqplqt.jpg "API")
