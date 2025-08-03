const mongoose = require('mongoose');

const testAPIConnection = async () => {
  try {
    console.log('🔗 Test de connexion API avec MongoDB Atlas...');
    
    // URI validée
    const uri = 'mongodb+srv://almadinah_admin:Almadinah2024@cluster0.nfzpdun.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
    
    await mongoose.connect(uri);
    
    console.log('✅ Connexion MongoDB réussie !');
    console.log('📊 Base de données:', mongoose.connection.name);
    console.log('🏠 Host:', mongoose.connection.host);
    
    // Test de création des collections Almadinah
    const collections = ['products', 'users', 'orders', 'categories'];
    
    for (const collectionName of collections) {
      const collection = mongoose.connection.collection(collectionName);
      
      // Test d'écriture
      const testDoc = {
        test: 'api_connection',
        collection: collectionName,
        date: new Date(),
        message: 'Test de connexion API Almadinah Boutique'
      };
      
      await collection.insertOne(testDoc);
      console.log(`✅ Test d'écriture réussi pour ${collectionName}`);
      
      // Test de lecture
      const result = await collection.findOne({ test: 'api_connection' });
      console.log(`✅ Test de lecture réussi pour ${collectionName}`);
      
      // Nettoyage
      await collection.deleteOne({ test: 'api_connection' });
      console.log(`✅ Test de suppression réussi pour ${collectionName}`);
    }
    
    await mongoose.connection.close();
    console.log('✅ Connexion fermée proprement');
    console.log('🎉 Tous les tests API sont réussis !');
    console.log('🚀 L\'API est prête pour le déploiement sur Render');
    
  } catch (error) {
    console.error('❌ Erreur de connexion API:', error.message);
    process.exit(1);
  }
};

testAPIConnection(); 