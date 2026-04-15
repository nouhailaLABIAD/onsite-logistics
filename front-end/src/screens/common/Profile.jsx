import React, { useState } from "react";
import { View, Text, TouchableOpacity, TextInput, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector, useDispatch } from "react-redux";
import AuthAPI from "../../services/AuthAPI";
import { logout } from "../../redux/authSlice";
import styles from "../../styles/profileStyle";

const Profile = ({ navigation }) => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const [isEditing, setIsEditing] = useState(false);

  const [fullName, setFullName] = useState(user?.fullName || "");
  const [email, setEmail] = useState(user?.email || "");

  if (!user) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }

  const handleSave = async () => {
    try {
      const res = await AuthAPI.patch("/users/profile", {
        fullName,
        email,
      });

      // update redux si besoin
      dispatch({ type: "auth/updateUser", payload: res.data });

      setIsEditing(false);
    } catch (err) {
      console.log("UPDATE ERROR:", err.response?.data);
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    navigation.reset({
      index: 0,
      routes: [{ name: "Login" }],
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>

        <View style={styles.avatarContainer}>
          <Text style={styles.name}>
            {isEditing ? "Edit Profile" : fullName}
          </Text>

          <View style={styles.roleBadge}>
            <Text style={styles.roleText}>{user.role?.toUpperCase()}</Text>
          </View>
        </View>

        {/* FULL NAME */}
        <View style={styles.infoCard}>
          <Text style={styles.infoLabel}>Full Name</Text>

          {isEditing ? (
            <TextInput
              value={fullName}
              onChangeText={setFullName}
              style={{ borderBottomWidth: 1 }}
            />
          ) : (
            <Text style={styles.infoValue}>{fullName}</Text>
          )}
        </View>

        {/* EMAIL */}
        <View style={styles.infoCard}>
          <Text style={styles.infoLabel}>Email</Text>

          {isEditing ? (
            <TextInput
              value={email}
              onChangeText={setEmail}
              style={{ borderBottomWidth: 1 }}
            />
          ) : (
            <Text style={styles.infoValue}>{email}</Text>
          )}
        </View>

        {/* BUTTONS */}
        {!isEditing ? (
          <TouchableOpacity
            style={styles.button}
            onPress={() => setIsEditing(true)}
          >
            <Text style={styles.buttonText}>✏️ Edit Profile</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.button}
            onPress={handleSave}
          >
            <Text style={styles.buttonText}>💾 Save</Text>
          </TouchableOpacity>
        )}

        {/* CHANGE PASSWORD */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("ChangePassword")}
        >
          <Text style={styles.buttonText}>🔒 Change Password</Text>
        </TouchableOpacity>

        {/* LOGOUT */}
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={handleLogout}
        >
          <Text style={styles.buttonText}>🚪 Logout</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;