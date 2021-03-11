import pymongo

client = pymongo.MongoClient('mongodb+srv://ronit:taj529klts@buddieychat.rohd2.mongodb.net/users?retryWrites=true&w=majority')
users_db = client['users']
chat_db = client['chats']

questions = {
    1: "What's your name?",
    2: "Do you like music?",
    3: "What's your favorite song?", # Only ask if 2 is yes
    4: "Do you have any pets?",
    5: "What is the most memorable place that you've ever been to?",
    6: "What did you like most about it?", # Only ask if 6 is yes
    7: "What's your favorite food to cook?",
    8: "What's your favorite food to eat?",
    9: "Do you have any children or grandchildren?",
    10: "What are the most important lessons you would like to pass on?",
    11: "If you could go back to any age, which one?"
}