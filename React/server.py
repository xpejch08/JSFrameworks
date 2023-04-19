import asyncio
import websockets

async def handle_connection(websocket, path):
    try:
        async for message in websocket:
            if message != "hello":  # Skip initial handshake message
                await websocket.send(message)
    except websockets.exceptions.ConnectionClosed:
        pass




async def main():
    async with websockets.serve(handle_connection, "localhost", 8000):
        print("Server started")
        await asyncio.Future()  # Run forever

asyncio.run(main())
