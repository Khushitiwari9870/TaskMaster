import json
from channels.generic.websocket import AsyncJsonWebsocketConsumer

class ProjectConsumer(AsyncJsonWebsocketConsumer):
    async def connect(self):
        self.project_id = self.scope['url_route']['kwargs']['project_id']
        self.group_name = f'project_{self.project_id}'
        await self.channel_layer.group_add(self.group_name, self.channel_name)
        await self.accept()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(self.group_name, self.channel_name)

    async def receive_json(self, content):
        # Broadcast received messages to the group
        await self.channel_layer.group_send(self.group_name, {
            'type':'project.message',
            'message': content
        })

    async def project_message(self, event):
        await self.send_json(event['message'])
