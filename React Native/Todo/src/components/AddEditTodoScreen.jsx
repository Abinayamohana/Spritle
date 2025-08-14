import React, { useContext } from "react";
import {
  View,
  StyleSheet,
  Modal,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Text,
  TextInput,
  Keyboard,
} from "react-native";
import { Formik } from "formik";
import { AppContext } from "../context/AppContext";
import { Ionicons } from "@expo/vector-icons";

// Add / Edit modal screen component
export default function AddEditTodoScreen({ onClose, todo }) {
  const { addTodo, updateTodo } = useContext(AppContext);
  const isEdit = !!todo;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{
        flex: 1,
        justifyContent: "center",
        backgroundColor: "rgba(146, 128, 162, 0.5)",
      }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.overlay}>
          <View style={styles.modalContainer}>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Ionicons name="close" size={24} color="gray" />
            </TouchableOpacity>
            <Text style={styles.title}>
              {isEdit ? "Edit Todo" : "Add Todo"}{" "}
            </Text>

            {/*  Formik handles form state and submission */}
            <Formik
              initialValues={{
                title: todo?.title || "",
                body: todo?.body || "",
              }}
              // Validates text box is empty
              validate={(values) => {
                const errors = {};
                if (!values.title.trim()) {
                  errors.title = "Title is required";
                }
                return errors;
              }}
              onSubmit={(values) => {
                if (isEdit) {
                  updateTodo(todo.id, {
                    ...todo,
                    title: values.title,
                    body: values.body,
                    completed: false,
                  });
                } else {
                  addTodo({
                    id: Date.now(),
                    title: values.title,
                    body: values.body,
                    completed: false,
                  });
                }
                onClose();
              }}
            >
              {({
                handleChange,
                handleSubmit,
                values,
                errors,
                touched,
                setFieldTouched,
              }) => (
                <View>
                  <TextInput
                    style={styles.input}
                    placeholder="Enter title"
                    value={values.title}
                    onChangeText={handleChange("title")}
                    onBlur={() => setFieldTouched("title")}
                  />
                  {touched.title && errors.title && (
                    <Text style={{ color: "red", marginBottom: 10 }}>
                      {errors.title}
                    </Text>
                  )}
                  <TextInput
                    style={[styles.input, styles.bodyInput]}
                    placeholder="Enter details"
                    value={values.body}
                    onChangeText={handleChange("body")}
                    multiline
                  />
                  <TouchableOpacity
                    style={[
                      styles.submitBtn,
                      !values.title.trim() && { backgroundColor: "#ccc" }, // disable style
                    ]}
                    onPress={handleSubmit}
                    disabled={!values.title.trim()}
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
    </KeyboardAvoidingView>
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
    textAlignVertical: "top",
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
