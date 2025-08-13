
import { StyleSheet } from 'react-native';
export default StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 8,
    marginBottom: 12,
  },

   logoImage: {
    padding: 40,
    alignSelf: 'center',
    marginBottom: 30,
    
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
    color: '#333',
  },

  linkText: {
    marginTop: 20,
    color: '#4CAF50',
    textAlign: 'center',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
  container: { 
    padding: 20,
    flex: 1,
    justifyContent: 'center', 
    backgroundColor: '#f0f4f8'
  },
  formBox:{
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0,height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5

  },
  input: { 
    marginBottom: 12, 
    borderRadius: 8, 
    fontSize: 16,
  },
  error: { 
    color: '#d9534f', 
    marginBottom: 8 
  },
  button: {
    marginTop: 12,
    backgroundColor: "#007bff",
    borderRadius: 8,
    overflow: 'hidden'  
  },
  // profile screen
  profileContainer:{
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
    shadowColor: '#000',
    elevation:3,
    shadowRadius: 8,
    marginTop: 40,
    marginBottom: 40,
    borderRadius: 20,
    alignSelf: 'center'
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  imageWrapper: {
    alignItems: 'center',
    marginBottom: 20, 
  },
  image: {
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 2,
    borderColor: '#ccc'
  },
  placeholder: {
    width: 160,
    height: 160,
    borderRadius: 80,
    borderWidth: 2,
    borderColor: '#aaa',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5'
  },
  placeholderText: {
    color: '#555',
    textAlign: 'center',
    fontWeight: '600'
  },
detailsCard: {
  backgroundColor: '#fff',
  padding: 20,
  borderRadius: 12,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 5,
  elevation: 3,
  marginBottom: 0,
  width: 300,
},
detailLabel: {
  fontSize: 16,
  fontWeight: '600',
  color: '#333',
  marginBottom: 4,
},
detailValue: {
  fontSize: 18,
  color: '#555',
  marginBottom: 12,
},
iconContainer: {
  flexDirection: "row",
  justifyContent: 'center',
  marginBottom: 20,
},
iconButton: {
  marginHorizontal: 20,
  backgroundColor: "#d2b9f5ff",
  padding: 8,
  borderRadius: 50,
},



  
  


})

