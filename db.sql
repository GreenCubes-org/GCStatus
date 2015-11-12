CREATE TABLE IF NOT EXISTS `statuses` (
`id` int(11) NOT NULL,
  `main_status` tinyint(1) NOT NULL,
  `main_online` int(11) NOT NULL,
  `web_status` tinyint(1) NOT NULL,
  `api_status` tinyint(1) NOT NULL,
  `help_status` tinyint(1) NOT NULL,
  `dev_status` tinyint(1) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
