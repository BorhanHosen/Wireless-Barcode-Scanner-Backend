import Product from "../models/Product.js";

const socketHandler = (io) => {
  io.on("connection", (socket) => {
    // console.log(`🔗 Client connected: ${socket.id}`);
    console.log("Device connected:", socket.id);

    socket.on("barcodeScanned", ({ deviceId, barcode }) => {
      console.log(`Received barcode from ${deviceId}:`, barcode);
      io.to(deviceId).emit("barcodeReceived", barcode);
    });

    socket.on("registerPC", (deviceId) => {
      socket.join(deviceId);
    });

    socket.on("disconnect", () => {
      console.log("Device disconnected:", socket.id);
    });

    // socket.on("addProduct", async (product) => {
    //   console.log("🛒 New Product:", product);
    //   try {
    //     const newProduct = new Product(product);
    //     await newProduct.save();
    //     io.emit("productAdded", newProduct);
    //   } catch (error) {
    //     console.error("❌ Error saving product:", error);
    //   }
    // });

    // socket.on("disconnect", () => {
    //   console.log(`❌ Client disconnected: ${socket.id}`);
    // });
  });
};

export default socketHandler;
