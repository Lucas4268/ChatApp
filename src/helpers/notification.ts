import notifee, { AndroidImportance, AndroidVisibility } from '@notifee/react-native';

export const notification = async ( title: string, body: string ) => {

    // async function onDisplayNotification() {
        // Create a channel

        const channelId = await notifee.createChannel({
            id: 'default',
            name: 'Default Channel',
            sound: 'hollow',
            importance: AndroidImportance.HIGH,
            visibility: AndroidVisibility.PUBLIC
        });
        
        // Display a notification
        await notifee.displayNotification({
            title,
            body,
            android: {
                channelId,
                importance: AndroidImportance.HIGH
            },
        });
    // }
}