const mongoose = require('mongoose');

const testConnection = async () => {
  try {
    console.log('🔗 Test de connexion MongoDB Atlas...');
    
    // URI fournie par l'utilisateur (avec correction des deux points)
    const uri = 'mongodb+srv://almadinah_admin:db_Almadinah2024@cluster0.nfzpdun.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
    
    console.log('🌐 URI (sans mot de passe):', uri.replace('db_Almadinah2024', '***'));
    console.log('🔍 Vérification de la syntaxe URI...');
    
    // Vérifier que l'URI contient bien les deux points
    if (!uri.includes('almadinah_admin:')) {
      console.log('❌ Erreur: URI mal formatée - manque les deux points');
      console.log('URI fournie:', uri);
      console.log('URI attendue: mongodb+srv://almadinah_admin:db_Almadinah2024@cluster0...');
      process.exit(1);
    }
    
    await mongoose.connect(uri);
    
    console.log('✅ Connexion MongoDB réussie !');
    console.log('📊 Base de données:', mongoose.connection.name);
    console.log('🏠 Host:', mongoose.connection.host);
    console.log('🔌 Port:', mongoose.connection.port);
    
    // Test de création d'une collection
    const testCollection = mongoose.connection.collection('test');
    await testCollection.insertOne({ 
      test: 'connection', 
      date: new Date(),
      message: 'Test de connexion Almadinah Boutique'
    });
    console.log('✅ Test d\'écriture réussi !');
    
    // Test de lecture
    const result = await testCollection.findOne({ test: 'connection' });
    console.log('✅ Test de lecture réussi !');
    console.log('📄 Document lu:', result);
    
    // Nettoyage
    await testCollection.deleteOne({ test: 'connection' });
    console.log('✅ Test de suppression réussi !');
    
    await mongoose.connection.close();
    console.log('✅ Connexion fermée proprement');
    console.log('🎉 Tous les tests MongoDB sont réussis !');
    
    // Sauvegarder l'URI valide
    const fs = require('fs');
    fs.writeFileSync('valid-mongodb-uri.txt', uri);
    console.log('💾 URI sauvegardé dans valid-mongodb-uri.txt');
    
  } catch (error) {
    console.error('❌ Erreur de connexion MongoDB:', error.message);
    console.error('🔍 Détails:', error);
    
    if (error.message.includes('authentication failed')) {
      console.log('💡 Suggestions:');
      console.log('1. Vérifiez le nom d\'utilisateur et mot de passe');
      console.log('2. Assurez-vous que l\'utilisateur a les bonnes permissions');
      console.log('3. Vérifiez que l\'IP est autorisée dans MongoDB Atlas');
      console.log('4. Vérifiez que l\'URI est correctement formatée');
    }
    
    process.exit(1);
  }
};

testConnection();
