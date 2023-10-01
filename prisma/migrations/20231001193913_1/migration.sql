-- CreateTable
CREATE TABLE `brand` (
    `Brand ID` INTEGER NOT NULL AUTO_INCREMENT,
    `Brand Name` VARCHAR(255) NOT NULL,
    `Date Inserted` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `Date updated` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`Brand ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci Engine innoDB;

-- CreateTable
CREATE TABLE `product` (
    `Product ID` INTEGER NOT NULL AUTO_INCREMENT,
    `Product Code` VARCHAR(255) NOT NULL,
    `Product Name` VARCHAR(255) NOT NULL,
    `Brand ID` INTEGER NOT NULL,
    `Date Inserted` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `Date updated` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`Product ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci Engine innoDB;

-- CreateTable
CREATE TABLE `customer` (
    `Customer ID` INTEGER NOT NULL AUTO_INCREMENT,
    `Customer Name` VARCHAR(255) NOT NULL,
    `Customer Address` VARCHAR(255) NOT NULL,
    `Gender` INTEGER NOT NULL,
    `Date Inserted` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `Date updated` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`Customer ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci Engine innoDB;

-- CreateTable
CREATE TABLE `pembelian` (
    `SO ID` INTEGER NOT NULL AUTO_INCREMENT,
    `Customer Name` INTEGER NOT NULL,
    `Product ID` INTEGER NOT NULL,
    `Quantity` DOUBLE NOT NULL,
    `Date Inserted` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `Date updated` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`SO ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci Engine innoDB;

-- AddForeignKey
ALTER TABLE `product` ADD CONSTRAINT `product_Brand ID_fkey` FOREIGN KEY (`Brand ID`) REFERENCES `brand`(`Brand ID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `pembelian` ADD CONSTRAINT `pembelian_Customer Name_fkey` FOREIGN KEY (`Customer Name`) REFERENCES `customer`(`Customer ID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `pembelian` ADD CONSTRAINT `pembelian_Product ID_fkey` FOREIGN KEY (`Product ID`) REFERENCES `product`(`Product ID`) ON DELETE RESTRICT ON UPDATE CASCADE;
