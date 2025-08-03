const mongoose = require('mongoose');

const testMultipleConnections = async () => {
  console.log('🔗 Test de connexion MongoDB Atlas - Multiple URIs');
  console.log('==================================================');
  
  const uris = [
    // URI original
    'mongodb+srv://almadinah_admin:db_oyD1mH8pqrkNbJ3o@cluster0.nfzpdun.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
    
    // URI avec mot de passe décodé
    'mongodb+srv://almadinah_admin:db_oyD1mH8pqrkNbJ3o@cluster0.nfzpdun.mongodb.net/almadinah-boutique?retryWrites=true&w=majority&appName=Cluster0',
    
    // URI avec mot de passe simple (test)
    'mongodb+srv://almadinah_admin:Almadinah2024@cluster0.nfzpdun.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
    
    // URI avec mot de passe simple et base de données
    'mongodb+srv://almadinah_admin:Almadinah2024@cluster0.nfzpdun.mongodb.net/almadinah-boutique?retryWrites=true&w=majority&appName=Cluster0'
  ];
  
  for (let i = 0; i < uris.length; i++) {
    const uri = uris[i];
    console.log(`\n🧪 Test ${i + 1}/${uris.length}:`);
    console.log('URI:', uri.replace(/:[^:@]+@/, ':***@'));
    
    try {
      await mongoose.connect(uri);
      
      console.log('✅ Connexion réussie !');
      console.log('📊 Base de données:', mongoose.connection.name);
      console.log('🏠 Host:', mongoose.connection.host);
      
      // Test d'écriture
      const testCollection = mongoose.connection.collection('test');
      await testCollection.insertOne({ 
        test: 'connection', 
        date: new Date(),
        message: 'Test de connexion Almadinah Boutique'
      });
      console.log('✅ Test d\'écriture réussi !');
      
      // Nettoyage
      await testCollection.deleteOne({ test: 'connection' });
      console.log('✅ Test de suppression réussi !');
      
      await mongoose.connection.close();
      console.log('✅ Connexion fermée proprement');
      console.log('🎉 URI valide trouvé !');
      
      return;
      
    } catch (error) {
      console.log('❌ Échec:', error.message);
      if (mongoose.connection.readyState === 1) {
        await mongoose.connection.close();
      }
    }
  }
  
  console.log('\n❌ Aucun URI valide trouvé');
  console.log('💡 Vérifiez votre configuration MongoDB Atlas');
};

testMultipleConnections(); 