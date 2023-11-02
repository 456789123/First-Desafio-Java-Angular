/*
################################################################################
#                               gerando a sequence                             #
################################################################################
*/

CREATE SEQUENCE co_seq_usuario
	INCREMENT 1
	MINVALUE 0
	MAXVALUE 9999
	START 1
	CACHE 1;

/*
################################################################################
#                              gerando a tabela                                #
################################################################################
*/

CREATE TABLE TB_USUARIO (
	COD_USUARIO    INTEGER      UNIQUE NOT NULL,
	NOME           VARCHAR(50)  NOT NULL,
	EMAIL          VARCHAR(100) UNIQUE NOT NULL,
	SENHA          VARCHAR(200)  NOT NULL,
	ROLE           VARCHAR(5)   NOT NULL,
	PRIMARY KEY (COD_USUARIO)
);

/*
################################################################################
#              vinculando a sequence  na tabela de usuario                     #
################################################################################
*/

ALTER TABLE  TB_USUARIO
ALTER COLUMN COD_USUARIO
SET DEFAULT  NEXTVAL('co_seq_usuario'::regclass);
UPDATE       TB_USUARIO
SET          COD_USUARIO = NEXTVAL('co_seq_usuario');


/*
################################################################################
#                         inserindo o primeiro usuario                         #
#                           senha criptografada                                #
#                                  123456                                      #
################################################################################
*/

--                        TB_USUARIO

INSERT INTO TB_USUARIO ( NOME, EMAIL, SENHA, ROLE )
VALUES ( 'Isaac Newton', 'isaac.newton@email.com.br', '$2a$10$rLXqXWU7JIYqyTIP6n1KyuhTCJoVu/dmy5t2PqgN7Hr9ftTPMf5Ae', 'ADMIN' );

/*
################################################################################
#                         deletando a tabela                                   #
################################################################################
*/


DROP TABLE TB_USUARIO;
DROP SEQUENCE co_seq_usuario;
