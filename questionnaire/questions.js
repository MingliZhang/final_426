const questions = [
    {
      "id": 1,
      "question": "Am the life of the party",
      "category": "extraversion",
      "scale": 1
    },
    {
      "id": 2,
      "question": "Feel little concern for others",
      "category": "agreeableness",
      "scale": -1
    },
    {
      "id": 3,
      "question": "Am always prepared",
      "category": "conscientiousness",
      "scale": 1
    },
    {
      "id": 4,
      "question": "Get stressed out easily",
      "category": "emotional_stability",
      "scale": -1
    },
    {
      "id": 5,
      "question": "Have a rich vocabulary",
      "category": "intellect",
      "scale": 1
    },
    {
      "id": 6,
      "question": "Don't talk a lot",
      "category": "extraversion",
      "scale": -1
    },
    {
      "id": 7,
      "question": "Am interested in people",
      "category": "agreeableness",
      "scale": 1
    },
    {
      "id": 8,
      "question": "Leave my belongings around",
      "category": "conscientiousness",
      "scale": -1
    },
    {
      "id": 9,
      "question": "Am relaxed most of the time",
      "category": "emotional_stability",
      "scale": 1
    },
    {
      "id": 10,
      "question": "Have difficulty understanding abstract ideas",
      "category": "intellect",
      "scale": -1
    },
    {
      "id": 11,
      "question": "Feel comfortable around people",
      "category": "extraversion",
      "scale": 1
    },
    {
      "id": 12,
      "question": "Insult people",
      "category": "agreeableness",
      "scale": -1
    },
    {
      "id": 13,
      "question": "Pay attention to details",
      "category": "conscientiousness",
      "scale": 1
    },
    {
      "id": 14,
      "question": "Worry about things",
      "category": "emotional_stability",
      "scale": -1
    },
    {
      "id": 15,
      "question": "Have a vivid imagination",
      "category": "intellect",
      "scale": 1
    },
    {
      "id": 16,
      "question": "Keep in the background",
      "category": "extraversion",
      "scale": -1
    },
    {
      "id": 17,
      "question": "Sympathize with other's feelings",
      "category": "agreeableness",
      "scale": 1
    },
    {
      "id": 18,
      "question": "Make a mess of things",
      "category": "conscientiousness",
      "scale": -1
    },
    {
      "id": 19,
      "question": "Seldom feel blue",
      "category": "emotional_stability",
      "scale": 1
    },
    {
      "id": 20,
      "question": "Am not interested in abstract ideas",
      "category": "intellect",
      "scale": -1
    },
    {
      "id": 21,
      "question": "Start conversations",
      "category": "extraversion",
      "scale": -1
    },
    {
      "id": 22,
      "question": "Am not interested in other people's problems",
      "category": "agreeableness",
      "scale": -1
    },
    {
      "id": 23,
      "question": "Get chores done right away",
      "category": "conscientiousness",
      "scale": 1
    },
    {
      "id": 24,
      "question": "Am easily disturbed",
      "category": "emotional_stability",
      "scale": -1
    },
    {
      "id": 25,
      "question": "Have excellent ideas",
      "category": "intellect",
      "scale": 1
    },
    {
      "id": 26,
      "question": "Have little to say",
      "category": "extraversion",
      "scale": -1
    },
    {
      "id": 27,
      "question": "Have a soft heart",
      "category": "agreeableness",
      "scale": 1
    },
    {
      "id": 28,
      "question": "Often forget to put things back in their place",
      "category": "conscientiousness",
      "scale": -1
    },
    {
      "id": 29,
      "question": "Get upset easily",
      "category": "emotional_stability",
      "scale": -1
    },
    {
      "id": 30,
      "question": "Do not have a good imagination",
      "category": "intellect",
      "scale": -1
    },
    {
      "id": 31,
      "question": "Talk to a lot of different people at parties",
      "category": "extraversion",
      "scale": 1
    },
    {
      "id": 32,
      "question": "Am not really interested in others",
      "category": "agreeableness",
      "scale": -1
    },
    {
      "id": 33,
      "question": "Like order",
      "category": "conscientiousness",
      "scale": 1
    },
    {
      "id": 34,
      "question": "Change my mood a lot",
      "category": "emotional_stability",
      "scale": -1
    },
    {
      "id": 35,
      "question": "Am quick to understand things",
      "category": "intellect",
      "scale": 1
    },
    {
      "id": 36,
      "question": "Don't like to draw attention to myself",
      "category": "extraversion",
      "scale": -1
    },
    {
      "id": 37,
      "question": "Take time out for others",
      "category": "agreeableness",
      "scale": 1
    },
    {
      "id": 38,
      "question": "Shirk my duties",
      "category": "conscientiousness",
      "scale": -1
    },
    {
      "id": 39,
      "question": "Have frequent mood swings",
      "category": "emotional_stability",
      "scale": -1
    },
    {
      "id": 40,
      "question": "Use difficult words",
      "category": "intellect",
      "scale": 1
    },
    {
      "id": 41,
      "question": "Don't mind being the center of attention",
      "category": "extraversion",
      "scale": 1
    },
    {
      "id": 42,
      "question": "Feel others' emotions",
      "category": "agreeableness",
      "scale": 1
    },
    {
      "id": 43,
      "question": "Follow a schedule",
      "category": "conscientiousness",
      "scale": 1
    },
    {
      "id": 44,
      "question": "Get irritated easily",
      "category": "emotional_stability",
      "scale": -1
    },
    {
      "id": 45,
      "question": "Spend time reflecting on things",
      "category": "intellect",
      "scale": 1
    },
    {
      "id": 46,
      "question": "Am quiet around strangers",
      "category": "extraversion",
      "scale": -1
    },
    {
      "id": 47,
      "question": "Make people feel at ease",
      "category": "agreeableness",
      "scale": 1
    },
    {
      "id": 48,
      "question": "Am exacting in my work",
      "category": "conscientiousness",
      "scale": 1
    },
    {
      "id": 49,
      "question": "Often feel blue",
      "category": "emotional_stability",
      "scale": -1
    },
    {
      "id": 50,
      "question": "Am full of ideas",
      "category": "intellect",
      "scale": 1
    }
  ]

  export default function getQuestions(){
      return questions
  }