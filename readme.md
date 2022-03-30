### Clean Architecture: TypeScript Express API
By employing clean architecture, you can design applications with very low coupling and independent of technical implementation details. That way, the application becomes easy to maintain and flexible to change. Clean architecture allows us to create architectural boundaries between dependencies which allows components to be swapped in and out and be intrinsically testable.


### The Plan
At a high level, we'd like our API to be structured in the following way

<img src="https://cdn-images-1.medium.com/max/800/1*49cl1bNu2tPAs1UNksleaA.jpeg" target="_blank" />


### Folder Structure
Let's use files and folders to structure our application. Doing this allows us to communicate architecture intent:

```
/src
│── main.ts
│── server.ts
│── presentation
│   └── routers
│       └── contact-router.ts
├── domain
│   ├── interfaces
│   │   ├── repositories
│   │   │    └── contact-repository.ts
│   │   └── use-cases
│   │       └── contact
│   │           ├── create-contact-use-case.ts
│   │           ├── delete-contact-use-case.ts
│   │           ├── get-all-contacts-use-case.ts
│   │           ├── get-one-contacts-use-case.ts
│   │           └── update-contact-use-case.ts
│   ├── models
│   │   └── contact.ts
│   ├── repositories
│   │   └── contact-repository.ts
│   └── use-cases
│       └── contact
│           ├── create-contact.ts
│           ├── delete-contact.ts
│           ├── get-all-contacts.ts
│           ├── get-one-contacts.ts
│           └── update-contact.ts
└── data
    ├── interfaces
    │   └── data-sources
    │       ├── nosql-database-wrapper.ts
    │       ├── sql-database-wrapper.ts
    │       └── contact-data-source.ts
    └── data-sources
        ├── mongodb
        │   └── mongodb-contact-data-source.ts
        └── postgresl
            └── pg-contact-data-source.ts
```

The presentation layer would mainly be used for inputting and outputting user data (API routes).

The inner core domain layer holds all business logic (use cases, repositories).

The data layer holds all infrastructure implementations (data sources).