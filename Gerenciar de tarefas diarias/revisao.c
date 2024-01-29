#include <stdio.h>
#include <stdlib.h>

#define Max_tar 100

int tar_index;
char tarefa[Max_tar][50];         
int cont_tarefa = 0;          
int escolha;                 
char nova_tarefa[50];



void adiciona_tarefa(char tarefa[][50], int *cont_tarefa) {

    printf("Digite o nome da nova tarefa: ");
    scanf(" %[^\n]", nova_tarefa);

    if (*cont_tarefa < Max_tar) {
        strcpy(tarefa[*cont_tarefa], nova_tarefa);
        (*cont_tarefa)++;

        printf("Tarefa adicionada com sucesso!\n");
    } else {
        printf("A lista de tarefas está cheia. Remova tarefas antes de adicionar mais.\n");
    }
}


void lista_tarefa(char tarefa[][50], int cont_tarefa) {

    if (cont_tarefa == 0) {
        printf("Nenhuma tarefa encontrada.\n");
    } else {

        printf("Lista de tarefas:\n");
        for (int i = 0; i < cont_tarefa; i++) {
            printf("%d. %s\n", i + 1, tarefa[i]);
        }
    }
}
c
void remove_tarefa(char tarefa[][50], int *cont_tarefa) {
    if (*cont_tarefa == 0) {
        printf("Nenhuma tarefa disponível para remover.\n");
        return;
    }

    printf("Digite o número da tarefa a ser removida: ");
    scanf("%d", &tar_index);

    if (tar_index >= 1 && tar_index <= *cont_tarefa) {
        printf("Tarefa removida: %s\n", tarefa[tar_index - 1]);
        for (int i = tar_index - 1; i < *cont_tarefa - 1; i++) {
            strcpy(tarefa[i], tarefa[i + 1]);
        }
        (*cont_tarefa)--;
    } else {
        
        printf("Índice inválido. Tarefa não encontrada.\n");
    }
}

int main() {
    
    while (1) {
        printf("\nMenu:\n");
        printf("1. Adicionar nova tarefa\n");
        printf("2. Listar todas as tarefas\n");
        printf("3. Remover tarefa\n");
        printf("4. Sair\n");
        printf("Escolha uma opção (1-4): ");
        scanf("%d", &escolha);

        switch (escolha) {
            case 1:
                adiciona_tarefa(tarefa, &cont_tarefa);
                break;
            case 2:
                lista_tarefa(tarefa, cont_tarefa);
                break;
            case 3:
                remove_tarefa(tarefa, &cont_tarefa);
                break;
            case 4:
                printf("Saindo do sistema. Até mais!\n");
                exit(0);
            default:
                printf("Opção inválida. Tente novamente.\n");
        }
    }

    return 0;
}