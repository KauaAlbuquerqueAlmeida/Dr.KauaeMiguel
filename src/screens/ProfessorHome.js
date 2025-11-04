import React, { useEffect, useState } from 'react';


async function handleDelete(classId) {
    const has = await classHasActivities(classId);
    if (has) {
        Alert.alert('Aviso', 'Você não pode excluir uma turma com atividades cadastradas');
        return;
    }


    Alert.alert('Confirmar', 'Deseja realmente excluir esta turma?', [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Excluir', style: 'destructive', onPress: async () => { await deleteClass(classId); load(); } }
    ]);
}


return (
    <View style={styles.container}>
        <Text style={styles.header}>Olá, {professor ? professor.name : 'Professor'}</Text>
        <Button title="Sair" onPress={handleLogout} />


        <View style={{ height: 12 }} />
        <Button title="Cadastrar Turma" onPress={() => navigation.navigate('CreateClass')} />


        <Text style={styles.section}>Suas turmas</Text>
        <FlatList
            data={classes}
            keyExtractor={item => item.id}
            ListEmptyComponent={<Text>Nenhuma turma cadastrada</Text>}
            renderItem={({ item, index }) => (
                <View style={styles.classRow}>
                    <View style={{ flex: 1 }}>
                        <Text style={{ fontWeight: '700' }}>{index + 1} - {item.name}</Text>
                    </View>
                    <Button title="Visualizar" onPress={() => navigation.navigate('ClassActivities', { classId: item.id, className: item.name })} />
                    <View style={{ width: 8 }} />
                    <Button title="Excluir" color="#cc0000" onPress={() => handleDelete(item.id)} />
                </View>
            )}
        />
    </View>
);


const styles = StyleSheet.create({
    container: { flex: 1, padding: 16 },
    header: { fontSize: 20, marginBottom: 8 },
    section: { marginTop: 12, fontSize: 16, fontWeight: '600' },
    classRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 8 }
});