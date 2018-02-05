export default`
  scalar Date
  type User {
    _id: ID!
    username: String
    email: String!
  }
  type Auth {
    token: String!
  }
  type Me {
    _id: ID!
    username: String
    email: String!
  }
  type Group {
    _id: String
    title: String
    user: User
    description: String
    createdAt: Date
    updatedAt: Date    
  }
  type Event {
    _id: String
    title: String
    description: String
    status: Int
    createdAt: Date
    updatedAt: Date
  }
  type Comment {
    _id: String
    name: String
    type: String
  }
  type Status {
    message: String!
  }

  type Query {
    getEvents: [Event]
    getGroups: [Group]
    getComments: [Comment]
    getEvent(_id: ID!): Event
    me: Me
  }
  type Mutation {
    addEvent(title: String!, description: String, status: Int): Event
    addGroup(title: String!, description: String): Group
    addComment(text:String!, postId: Int): Comment
    updateEvent(_id: ID!, name: String): Event
    deleteEvent(_id: ID!): Status

    signup(email: String!, password: String!, username: String): Auth
    login(email: String!, password: String!): Auth
  }

  schema {
    query: Query
    mutation: Mutation
  }
`;