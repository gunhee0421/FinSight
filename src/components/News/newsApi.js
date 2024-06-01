import React, { useState } from "react";
import { View, Button, TextInput } from 'react-native';
import axios from 'axios';

function NewsApi() {
    const [data, setData] = useState(null);

    const onClick = async () => {
        try {
            const response = await axios.get('https://newsapi.org/v2/everything', {
                params: {
                    q: 'Apple',
                    from: '2024-05-29',
                    sortBy: 'popularity',
                    apiKey: 'd2c59ad03aa64c6ab4b98bc563945db3'
                }
            });
            setData(response.data);
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <View>
            <View>
                <Button onPress={onClick} title="불러오기" />
            </View>
            {data && <TextInput multiline={true} numberOfLines={7} value={JSON.stringify(data, null, 2)} />}
        </View>
    );
}

export default NewsApi;
