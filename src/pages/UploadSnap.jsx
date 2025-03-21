import React, { useState } from "react";
import { storage, databases, ID } from "../appwrite/appwriteConfig";

function UploadSnap() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    image: null,
  });

  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  // 🔄 Handle Input Changes
  const handleChange = (e) => {
    if (e.target.name === "image") {
      const file = e.target.files[0];
      if (file) {
        setFormData({ ...formData, image: file });
        setPreview(URL.createObjectURL(file));
      }
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  // 🚀 Handle Form Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.image) return alert("Please upload an image.");

    setUploading(true);
    setSuccessMsg("");
    setErrorMsg("");

    try {
      // 1. Upload Image to Appwrite Storage
      const fileUpload = await storage.createFile(
        "67d3d72e0033170ca6c4", // 🔁 Replace with your Bucket ID
        ID.unique(),
        formData.image
      );

      // 2. Get public URL
      const imageUrl = storage.getFilePreview(
        "67d3d72e0033170ca6c4",
        fileUpload.$id
      );

      // 3. Save to Database
      await databases.createDocument(
        "67d3d6be003010530feb", // Replace with your Database ID
        "67dc299f00122c93380a", // Replace with your Collection ID
        ID.unique(),
        {
          title: formData.title,
          description: formData.description,
          category: formData.category,
          imageUrl: imageUrl.href,
        }
      );

      setSuccessMsg("Snap uploaded successfully! 🎉");
      setFormData({ title: "", description: "", category: "", image: null });
      setPreview(null);
    } catch (error) {
      console.error("Upload error:", error);
      setErrorMsg("Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-gray-100 px-4 py-10 flex items-center justify-center">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-green-600 text-center mb-6">
          Upload Your Food Snap
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title Input */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              placeholder="Delicious Pasta..."
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Description Input */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              placeholder="Tell us about your dish..."
              rows={4}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Category Select */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Category
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="">Select category</option>
              <option>Breakfast</option>
              <option>Lunch</option>
              <option>Dinner</option>
              <option>Dessert</option>
              <option>Snacks</option>
              <option>Beverages</option>
            </select>
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Upload Image
            </label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Preview */}
          {preview && (
            <div className="mt-4">
              <p className="text-gray-600 mb-2">Preview:</p>
              <img
                src={preview}
                alt="Preview"
                className="w-full h-64 object-cover rounded-lg shadow"
              />
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={uploading}
            className="w-full bg-green-600 text-white font-semibold py-3 rounded-lg hover:bg-green-700 transition duration-300 disabled:opacity-50"
          >
            {uploading ? "Uploading..." : "Upload Snap"}
          </button>

          {/* Success/Error Messages */}
          {successMsg && (
            <p className="text-green-600 text-center mt-4 font-medium">
              {successMsg}
            </p>
          )}
          {errorMsg && (
            <p className="text-red-500 text-center mt-4 font-medium">
              {errorMsg}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}

export default UploadSnap;
