export type Participant = {
    room_id: string;
    user_id: string;
    room: {
        game: string,
        users: string[],
    }


    is_connected?: boolean;
}