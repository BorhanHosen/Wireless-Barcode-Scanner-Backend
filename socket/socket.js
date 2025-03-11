import Product from "../models/Product.js";

const socketHandler = (io) => {
  const activeConnections = {}; // { uniqueKey: socketId }

  // When a PC screen connects
  io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);

    // PC registers itself with a unique key
    socket.on("registerPC", (uniqueKey) => {
      activeConnections[uniqueKey] = socket.id;
      console.log(`PC registered with key: ${uniqueKey}`);
    });

    // Mobile scanner sends a scanned barcode
    socket.on("scanBarcode", ({ uniqueKey, barcode }) => {
      const pcSocketId = activeConnections[uniqueKey];
      if (pcSocketId) {
        io.to(pcSocketId).emit("receiveBarcode", barcode);
        console.log(`Sent barcode ${barcode} to PC: ${uniqueKey}`);
      }
    });

    socket.on("disconnect", () => {
      console.log("A user disconnected:", socket.id);
      for (const key in activeConnections) {
        if (activeConnections[key] === socket.id) {
          delete activeConnections[key];
        }
      }
    });
  });
  // io.on("connection", (socket) => {
  //   // console.log(`🔗 Client connected: ${socket.id}`);
  //   console.log("Device connected:", socket.id);

  //   socket.on("barcodeScanned", ({ deviceId, barcode }) => {
  //     console.log(`Received barcode from ${deviceId}:`, barcode);
  //     io.to(deviceId).emit("barcodeReceived", barcode);
  //   });

  //   socket.on("registerPC", (deviceId) => {
  //     socket.join(deviceId);
  //   });

  //   socket.on("disconnect", () => {
  //     console.log("Device disconnected:", socket.id);
  //   });

  //   // socket.on("addProduct", async (product) => {
  //   //   console.log("🛒 New Product:", product);
  //   //   try {
  //   //     const newProduct = new Product(product);
  //   //     await newProduct.save();
  //   //     io.emit("productAdded", newProduct);
  //   //   } catch (error) {
  //   //     console.error("❌ Error saving product:", error);
  //   //   }
  //   // });

  //   // socket.on("disconnect", () => {
  //   //   console.log(`❌ Client disconnected: ${socket.id}`);
  //   // });
  // });
};

export default socketHandler;
