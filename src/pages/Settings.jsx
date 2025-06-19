import React, { useEffect, useRef, useState } from "react";
import Button from "../components/Button";
import InputField from "../components/InputField";
import {
  getUserInfo,
  handleProfileImageUpload,
  handleUserInfo,
} from "../service/authService";
import { toast } from "react-toastify";

function Settings() {
  const [userData, setUserData] = useState();
  const [editable, setEditable] = useState(false);
  const inputImage = useRef(null);
  const [image, setImage] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState("");
  const [contact, setContact] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    async function getUserData() {
      try {
        const res = await getUserInfo();
        // console.log(res.data);
        setUserData(res.data);
      } catch (error) {
        console.log("Error while fetching user info : ", error);
      }
    }
    getUserData();
  }, []);

  useEffect(() => {
    if (userData) {
      setImage(userData.profileImageUrl || "");
      setFullName(userData.name || "");
      setEmail(userData.email || "");
      setGender(userData.gender || "");
      setDob(userData.dateOfBirth || "");
      setContact(userData.number || "");
    }
  }, [userData]);

  // This methods handle image preview
  const handleImagePreview = async (e) => {
    const files = e.target.files[0];
    if (!files.type.startsWith("image/")) {
      toast.error("Please upload a valid image");
      return;
    }
    const url = URL.createObjectURL(files);
    setImage(url);
    setSelectedImage(files);
  };

  const handleFormSubmission = async (e) => {
    e.preventDefault();
    if (fullName.trim() !== "") {
      const obj = {
        name: fullName,
        email: email,
        gender: gender,
        dateOfBirth: dob,
        number: contact,
      };

      try {
        setIsSubmitting(true);
        const response = await handleUserInfo(JSON.stringify(obj));

        if (response.status === 200) {
          setEditable(false);
          toast.success("User information Updated Successfully", {
            position: "top-center",
          });

          setIsSubmitting(false);
        }
      } catch (error) {
        console.log("User Info Form Error :", error);
        setIsSubmitting(false);
      }
    }
    if (selectedImage !== null) {
      const formData = new FormData();
      formData.append("profilePic", selectedImage);
      try {
        setIsSubmitting(true);
        const imageUploadResponse = await handleProfileImageUpload(formData);
        if (imageUploadResponse.status === 200) {
          toast.success("User Profile Picture Updated Successfully", {
            position: "top-center",
          });
        }
        setIsSubmitting(false);
      } catch (error) {
        console.log("User Profile Pic Update Error :", error);
        setIsSubmitting(false);
      }
    }
  };

  return (
    <>
      <div className="mb-10">
        <div className="shadow-lg py-4 mb-5">
          <h1 className="text-xl md:text-2xl font-medium text-center uppercase ">
            Settings
          </h1>
        </div>
        {/* Profile Settings */}
        {userData ? (
          <div className="md:p-4">
            <div className="flex flex-wrap justify-between items-center">
              <div className="flex items-center gap-4 pl-2 md:pl-6">
                <div
                  className="border-2 h-32 w-32 rounded-full overflow-hidden cursor-pointer relative flex items-center justify-center"
                  onClick={() => {
                    if (editable) {
                      inputImage.current.click();
                    }
                  }}
                >
                  {editable ? (
                    <div className="absolute inset-0 z-10 bg-black/50 flex justify-center items-center text-white">
                      <img
                        src="/profile-edit.svg"
                        alt="Upload Image"
                        className="w-10"
                      />
                    </div>
                  ) : null}
                  {userData.profileImageUrl === null ? (
                    <img src="/profile.png" alt="Upload Profile Pic" />
                  ) : (
                    <img src={image} alt="profile" />
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    ref={inputImage}
                    onChange={handleImagePreview}
                    className="hidden"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <h1 className="text-md md:text-2xl font-medium">
                    {fullName}
                  </h1>
                  <p className="text-sm md:text-md text-gray-500">{email}</p>
                </div>
              </div>
              <div className="flex w-full md:w-auto justify-center gap-4 md:gap-0 mt-4 md:mt-0">
                <div>
                  <Button
                    className="w-32 h-12 tracking-wide"
                    onClick={() => {
                      localStorage.removeItem("accessToken");
                    }}
                  >
                    Logout
                  </Button>
                </div>
                <div className="md:px-4">
                  <Button
                    className="w-32 h-12 tracking-wide"
                    onClick={() => setEditable(!editable)}
                  >
                    Edit
                  </Button>
                </div>
              </div>
            </div>
            {/* Profile Form */}
            <div>
              <form
                onSubmit={(e) => handleFormSubmission(e)}
                className="mt-6 pl-6 flex flex-col gap-6"
              >
                <div className="flex w-full">
                  <div className="flex flex-col gap-1 w-1/2">
                    <label htmlFor="fullName" className="text-md">
                      Full Name
                    </label>
                    <InputField
                      type="text"
                      name="fullName"
                      id="fullName"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Enter Your Full Name"
                      className="w-[90%] bg-gray-100 border-gray-100 px-4 font-medium placeholder:font-normal"
                      readOnly={!editable}
                    />
                  </div>
                  <div className="flex flex-col gap-1 w-1/2">
                    <label htmlFor="username" className="text-md">
                      Username
                    </label>
                    <InputField
                      type="text"
                      name="username"
                      value={userData?.username}
                      id="username"
                      readOnly={true}
                      className="w-[90%] bg-gray-100 border-gray-100 px-4 font-medium placeholder:font-normal"
                    />
                  </div>
                </div>
                {/* 2 */}
                <div className="flex w-full">
                  <div className="flex flex-col gap-1 w-1/2">
                    <label htmlFor="email" className="text-md">
                      Email
                    </label>
                    <InputField
                      type="email"
                      name="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter Your Email"
                      className="w-[90%] bg-gray-100 border-gray-100 px-4 font-medium placeholder:font-normal"
                      readOnly={!editable}
                    />
                  </div>
                  <div className="flex flex-col gap-1 w-1/2">
                    <label htmlFor="gender" className="text-md">
                      Gender
                    </label>
                    <select
                      name="gender"
                      id="gender"
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                      className={` w-[90%] px-4 shadow-sm border-2 border-gray-100 rounded-sm  mt-1  py-2 bg-gray-100 font-medium `}
                      disabled={!editable}
                    >
                      <option value="">Select Your Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                  </div>
                </div>
                {/* 3 */}
                <div className="flex w-full">
                  <div className="flex flex-col gap-1 w-1/2">
                    <label htmlFor="dob" className="text-md">
                      Date of Birth
                    </label>
                    <InputField
                      type="date"
                      name="dob"
                      id="dob"
                      value={dob}
                      onChange={(e) => setDob(e.target.value)}
                      placeholder="Enter Your Date of Birth"
                      className="w-[90%] bg-gray-100 border-gray-100 px-4 font-medium placeholder:font-normal"
                      readOnly={!editable}
                    />
                  </div>
                  <div className="flex flex-col gap-1 w-1/2">
                    <label htmlFor="phNumber" className="text-md">
                      Contact
                    </label>
                    <InputField
                      type="number"
                      name="phNumber"
                      id="phNumber"
                      value={contact}
                      onChange={(e) => setContact(e.target.value)}
                      placeholder="Enter Your Phone No"
                      className="w-[90%] bg-gray-100 border-gray-100 px-4 font-medium placeholder:font-normal"
                      readOnly={!editable}
                    />
                  </div>
                </div>
                {editable ? (
                  <Button
                    disabled={isSubmitting}
                    className={`w-full uppercase tracking-wider mt-4 ${
                      isSubmitting ? "bg-blue-500/50" : ""
                    }`}
                  >
                    {isSubmitting ? "Saving..." : "Save"}
                  </Button>
                ) : null}
              </form>
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
}

export default Settings;
