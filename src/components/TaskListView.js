import React, { Component } from 'react';
import { View, SectionList, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default class TaskListView extends Component {

    /** O método _renderSectionHeader representa o título das seções.  */
    _renderSectionHeader(sectionData) {
        return (
            <View style={styles.headerConteiner}>
                <View style={styles.headerTagConteiner}>
                    <Text
                        style={styles.headerTagText}>{sectionData.section.title.substr(0, 1)}</Text>
                </View>
                <Text style={styles.headerText}>{sectionData.section.title}</Text>
            </View>
        );
    }

    /** O método _renderItem representa cada Task que será listada em nossa tela. */
    _renderItem(itemData) {
        return (
            <TouchableOpacity onPress={() => this._onClickTask(itemData.item)}>
                <View style={styles.itemConteiner}>
                    <Text style={styles.itemTextTitle}>{itemData.item.title}</Text>
                    <Text>{itemData.item.resume}</Text>
                </View>
            </TouchableOpacity>
        );
    }

    _onClickTask(task) {
        const { navigate } = this.props.navigation;
        navigate('Task', { task });
    }

    /**
     * Método render. Usamos o componente SectionList que é o responsável em listar nossas Tasks. 
     * Codificamos 3 pontos importantes no trecho de código. 
     *  1º -  Codificamos a propriedade renderSectionHeader do componente SectionList onde definimos 
     *   como será a apresentação do título das seções. A propriedade renderSectionHeader recebe como 
     *   parâmetro o método _renderSectionHeader. 
     *  2 º - Codificamos a propriedade sections que recebe como parâmetro um array. Esse array é 
     *   definido através de um filtro sobre as Tasks com alta prioridade e baixa prioridade. 
     *  3 º - Codificamos a propriedade renderItem onde definimos como será a apresentação de cada Task. 
     *   A propriedade renderItem recebe como parâmetro o método _renderItem.
     */
    render() {
        return (
            <SectionList renderSectionHeader={(section) =>
                this._renderSectionHeader(section)}
                sections={[
                    {
                        data: this.props.tasks.filter((data) => {
                            return data.priority
                        }), key: "hightPriority", title: 'Hight Priority'
                    },
                    {
                        data: this.props.tasks.filter((data) => {
                            return !data.priority
                        }), key: "lowPriority", title: 'Low Priority'
                    },
                ]}
                renderItem={(data) => this._renderItem(data)} />
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        paddingLeft: 10,
        paddingRight: 10
    },
    headerConteiner: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'silver',
        borderRadius: 25,
        marginTop: 10
    },
    headerTagConteiner: {
        backgroundColor: 'gray',
        height: 35,
        width: 35,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 25
    },
    headerTagText: {
        color: '#FFF',
        fontSize: 22
    },
    headerText: {
        fontSize: 16,
        marginLeft: 10
    },
    itemConteiner: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#F3F2F0',
        marginTop: 5,
        padding: 10,
        height: 75
    },
    itemTextTitle: {
        fontSize: 22
    }
});