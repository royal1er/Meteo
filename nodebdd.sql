CREATE database nodebdd CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE nodebdd;

CREATE TABLE tlivre (
  id int(11) NOT NULL,
  name varchar(50) NOT NULL,
  message varchar(300) NOT NULL,
  evaluation int(1)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Contenu de la table 'tlivre'

INSERT INTO tlivre (id, name, message, evaluation) VALUES
(1, 'NORRIS CHUCK', 'Best web site David ;)', 5),
(2, 'KENT Clark', 'Need informations about Baartman please', 4),
(3, 'Parr Hélène', 'Hey nothing about girl in computer science!!!', 0),
(4, 'DE LA VEGA Don Diego', 'Something Zorro? Your ebsite is zero',0),
(5, 'M. BEANS', 'Are you serious? Do not play with security', 2);

CREATE USER 'admtlivre'@'localhost' IDENTIFIED BY 'adm123';
GRANT ALL PRIVILEGES ON * . * TO 'admtlivre'@'localhost';
