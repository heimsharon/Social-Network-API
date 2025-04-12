export const users = [
  {
    username: 'john_doe',
    email: 'john.doe@example.com',
  },
  {
    username: 'jane_doe',
    email: 'jane.doe@example.com',
  },
  {
    username: 'alice_smith',
    email: 'alice.smith@example.com',
  },
  {
    username: 'bob_brown',
    email: 'bob.brown@example.com',
  },
  {
    username: 'charlie_white',
    email: 'charlie.white@example.com',
  },
];

export const thoughts = [
  {
    thoughtText: 'This is a thought by John',
    username: 'john_doe',
    reactions: [
      {
        reactionBody: 'Nice thought!',
        username: 'jane_doe',
      },
      {
        reactionBody: 'I agree with this!',
        username: 'alice_smith',
      },
    ],
  },
  {
    thoughtText: 'This is a thought by Jane',
    username: 'jane_doe',
    reactions: [
      {
        reactionBody: 'Interesting perspective!',
        username: 'john_doe',
      },
    ],
  },
  {
    thoughtText: 'Alice shares her first thought',
    username: 'alice_smith',
    reactions: [
      {
        reactionBody: 'Great thought, Alice!',
        username: 'bob_brown',
      },
    ],
  },
  {
    thoughtText: 'Bob’s random thought of the day',
    username: 'bob_brown',
    reactions: [
      {
        reactionBody: 'Haha, this is funny!',
        username: 'charlie_white',
      },
    ],
  },
  {
    thoughtText: 'Charlie’s deep philosophical thought',
    username: 'charlie_white',
    reactions: [
      {
        reactionBody: 'This is so profound!',
        username: 'john_doe',
      },
      {
        reactionBody: 'I need to think about this more.',
        username: 'alice_smith',
      },
    ],
  },
];