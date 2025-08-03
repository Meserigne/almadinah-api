const mongoose = require('mongoose');

const testMultipleURIs = async () => {
  console.log('🔗 Test de connexion MongoDB Atlas - Multiple URIs');
  console.log('==================================================');
  
  // Différentes variantes de l'URI à tester
  const uris = [
    // URI originale fournie
    'mongodb+srv://almadinah_admin<db_Almadinah2024>@cluster0.nfzpdun.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
    
    // URI avec deux points (format standard)
    'mongodb+srv://almadinah_admin:db_Almadinah2024@cluster0.nfzpdun.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
    
    // URI avec base de données spécifiée
    'mongodb+srv://almadinah_admin:db_Almadinah2024@cluster0.nfzpdun.mongodb.net/almadinah-boutique?retryWrites=true&w=majority&appName=Cluster0',
    
    // URI avec mot de passe simple
    'mongodb+srv://almadinah_admin:Almadinah2024@cluster0.nfzpdun.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
    
    // URI avec mot de passe simple et base de données
    'mongodb+srv://almadinah_admin:Almadinah2024@cluster0.nfzpdun.mongodb.net/almadinah-boutique?retryWrites=true&w=majority&appName=Cluster0'
  ];
  
  for (let i = 0; i < uris.length; i++) {
    const uri = uris[i];
    console.log(`\n🧪 Test ${i + 1}/${uris.length}:`);
    console.log('URI:', uri.replace(/:[^:@]+@/, ':***@').replace(/<[^>]+>/, '<***>'));
    
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
      
      // Sauvegarder l'URI valide
      const fs = require('fs');
      fs.writeFileSync('valid-mongodb-uri.txt', uri);
      console.log('💾 URI sauvegardé dans valid-mongodb-uri.txt');
      
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
  console.log('📋 Suggestions:');
  console.log('1. Vérifiez que l\'utilisateur almadinah_admin existe');
  console.log('2. Vérifiez que le mot de passe est correct');
  console.log('3. Vérifiez que l\'IP est autorisée (0.0.0.0/0)');
  console.log('4. Vérifiez que l\'utilisateur a les bonnes permissions');
};

testMultipleURIs(); 