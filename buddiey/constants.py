import pymongo

client = pymongo.MongoClient('mongodb+srv://ronit:taj529klts@buddieychat.rohd2.mongodb.net/users?retryWrites=true&w=majority')
users_db = client['users']
chat_db = client['chats']