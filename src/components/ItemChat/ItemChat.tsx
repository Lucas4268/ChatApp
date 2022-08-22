import React, { ReactElement } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

interface Props {
    children: ReactElement | ReactElement[],
    handleClick: () => void
}

export const ItemChat = ({ handleClick, children }: Props) => {
    return (
        <TouchableOpacity
            activeOpacity={ .8 }
            onPress={ handleClick }
            style={ styles.itemChat }
        >
            { children }
        </TouchableOpacity>
    );
};


const styles = StyleSheet.create({
    itemChat: {
        height: 80,
        flexDirection: 'row',
    }
})
