import React, { useContext } from "react";
import {
  View,
  StyleSheet,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Text,
  TextInput,
} from "react-native";
import { Formik } from "formik";
import { AppContext } from "../context/AppContext";
import { Ionicons } from "@expo/vector-icons";

// Add / Edit modal screen component
export default function AddEditTodoScreen({ navigation, route }) {
  const { addTodo, updateTodo } = useContext(AppContext);
  const todo = route.params?.todo;
  const isEdit = !!todo;

  // close the modal and go back
  const handleClose = () => navigation.goBack();

  return (
      <Modal animationType="slide" transparent={true} visible={true} onRequestClose={handleClose}>
        <TouchableWithoutFeedback onPress={handleClose}>
        <View style={styles.overlay}>
          <View style={styles.modalContainer}>
            <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
              <Ionicons name="close" size={24} color="gray" />
            </TouchableOpacity>
            <Text style={styles.title}>
              {isEdit ? "Edit Todo" : "Add Todo"}{" "}
            </Text>

            {/*  Formik handles form state and submission */}
            <Formik
              initialValues={{ 
                title: todo?.title || "",
                body: todo?.body || ""

               }}
              onSubmit={(values) => {
                if (isEdit) {
                  updateTodo(todo.id, { ...todo, title: values.title, body: values.body });
                } else {
                  addTodo({ id: Date.now(), title: values.title, body: values.body });
                }
                navigation.goBack();
              }}
            >
              {({ handleChange, handleSubmit, values }) => (
                <View style={styles.container}>
                  <TextInput
                    style={styles.input}
                    placeholder="Enter title"
                    value={values.title}
                    onChangeText={handleChange("title")}
                  />
                  <TextInput
                    style={ [styles.input, styles.bodyInput]}
                    placeholder="Enter details"
                    value={values.body}
                    onChangeText={handleChange("body")}
                    multiline 
                  />
                  <TouchableOpacity
                    style={styles.submitBtn}
                    onPress={handleSubmit}
                  >
                    <Text style={styles.submitText}>
                      {isEdit ? "Update" : "Add"}
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </Formik>
          </View>
        </View>
        </TouchableWithoutFeedback>
      </Modal>

  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    padding: 20,
  },
  modalContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    elevation: 5,
  },
  closeButton: {
    alignSelf: "flex-end",
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
    fontSize: 16,
  },
  bodyInput: {
    height: 100,
    textAlignVertical: 'top'

  },
  submitBtn: {
    backgroundColor: "#b38bebff",
    paddingVertical: 12,
    borderRadius: 8,
  },
  submitText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
    fontWeight: "500",
  },
});
