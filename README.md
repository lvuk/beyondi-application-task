# RESTful API Design-Driven Approach by using Swagger

## Technologies

- TypeScript
- NodeJS
- Fastify
- TypeORM
- MariaDB
- JWT

## How to setup and run

1. Install all packages with `npm install`
2. You need to make yourself a .env file (You have .env.example file inside root directory)
3. Start backend with `npm run dev`
4. Go to `localhost:{PORT}/documentation` to see all available routes

# Questionaire

1. Please describe your understanding of Bitcoin Protocol or Blockchain itself. Try to use an example. Be simple and focus on the problem which it is solving.

> Blockchain is a distributed “database” that consists of blocks that are connected one to another using cryptography and because of that they are immutable. They are connected in a way that every block has a hash of a previous block recorded in the chain. That means if we change something in block number 3, all hashes of the 4,5,6.. would change.

> So if we have a distributed system where 5 people have a “database record” and one person tries to change something inside their “record”, these 4 people can agree that the record of the person who changed something is no longer valid. That are the core problems that blockchain technology is solving, trust and decentralization, meaning there is no individual that is controlling everything, full democracy.

2. Please describe what is most important to you in software development. You can use samples, past experiences or issues and how did you solve it.

> Most important thing in software development for me is good communication between colleagues and a positive environment. Also in this part of my career it is important for me to learn everything I can from more experienced engineers that will make me a better software engineer.

> Some other things that are important in software development as being part of a team are having clear blueprints around a naming convention, architecture of a project, and establishing consistent coding practices that everyone follows to ensure readability, maintainability, and scalability of the codebase.

3. Please describe your approach to software development and problem solving. What agile method did you use or you like to use, how do you plan and schedule tasks

> My approach would be that first I analyze problems and try to break the “big” problem down to a bunch of smaller ones and then start with those small problems. I try to plan my tasks a week in advance so I can then schedule as I have time in a day. First task of the day is always the biggest one because my mental capacity is at its peak. I did not user any agile methods before

4. Please describe why blockchain is better than current traditional information systems and what are the benefits and drawbacks of it. Please use your own words.

> Blockchain is better from traditional systems as I said above removes trust as a factor when dealing with something, because there is no one individual that is controlling the whole network.
> It is also better because it is all transparent in a blockchain due to its immutability. In monetary terms it gives an ability for people to transfer money between themselves without intermediary 24/7.

> Drawbacks of blockchain is it is not so scalable, for example in Ethereum blockchain the process of verifying transactions can be slower, about 15 tx/s. So systems could struggle and could struggle to handle high volume. Some other drawback is power consumption in Bitcoin, because of its Proof of Work it needs high computational power which increase power consumption

5. Please describe the last technical article which you read and how you stay up to date with community news and information on a daily basis. What are the topics you follow?

> The last technical article I read was about how to use debouncer in iOS application and how to do it. So the in simple ways debouncer enables us to not call backend everytime user types a letter. It calls backend only if user stops typing for some specified amount of time.

> I am using `daily.dev` as my tech forum where I read thing about development and software engineer. Also I use twitter to stay up with updates about cryptocurrencies and stocks. Topics I mostly follwed are: SD(backend, iOS), cryptocurrencies, stocks,
