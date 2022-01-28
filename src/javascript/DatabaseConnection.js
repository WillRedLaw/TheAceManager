const {MongoClient} = require('mongodb');

async function main() {
	

    const uri = "mongodb+srv://DB:RedAlpha1235673@cluster0.4oacd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";


    const client = new MongoClient(uri);

    try{
        await client.connect();
    }

    catch (e){
        console.error(e);
    } finally{
        await client.close();
    }

    main().catch(console.error);


    
}