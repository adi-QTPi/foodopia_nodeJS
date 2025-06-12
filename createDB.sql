-- Create database
CREATE DATABASE foodopia_nodeJS;
-- Use the database
USE foodopia_nodeJS;

-- Category table (referenced by item table)
CREATE TABLE category (
    cat_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    cat_name VARCHAR(255) NOT NULL,
    cat_description VARCHAR(500)
);

-- User table with UUID user_id
CREATE TABLE user (
    user_id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
    user_name VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    pwd_hash VARCHAR(255) NOT NULL,
    profile_pic VARCHAR(500),
    role ENUM('customer', 'cook', 'admin') NOT NULL
);

-- Table table
CREATE TABLE `table` (
    table_id BIGINT PRIMARY KEY,
    is_empty BOOLEAN
);

-- Item table
CREATE TABLE item (
    item_id BIGINT AUTO_INCREMENT PRIMARY KEY ,
    item_name VARCHAR(255) NOT NULL,
    cook_time_min BIGINT,
    price BIGINT NOT NULL,
    display_pic VARCHAR(500),
    cat_id BIGINT NOT NULL,
    subcat ENUM('breakfast', 'lunch', 'dinner') NOT NULL,
    FOREIGN KEY (cat_id) REFERENCES category(cat_id)
);

-- Order table
CREATE TABLE `order` (
    order_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    order_at TIMESTAMP NOT NULL,
    table_no BIGINT,
    customer_id VARCHAR(36) NOT NULL,
    status ENUM('received', 'cooking', 'ready_to_serve', 'paid'),
    total_price BIGINT NOT NULL DEFAULT 0,
    FOREIGN KEY (customer_id) REFERENCES user(user_id),
    FOREIGN KEY (table_no) REFERENCES `table`(table_id)
);

-- Item_order table (junction table)
CREATE TABLE item_order (
    order_id BIGINT,
    item_id BIGINT,
    quantity INTEGER NOT NULL,
    instruction VARCHAR(500),
    is_complete ENUM('pending', 'taken', 'complete') NOT NULL DEFAULT 'pending',
    cook_id VARCHAR(36) NULL,
    PRIMARY KEY (order_id, item_id),
    FOREIGN KEY (order_id) REFERENCES `order`(order_id),
    FOREIGN KEY (item_id) REFERENCES item(item_id),
    FOREIGN KEY (cook_id) REFERENCES user(user_id)
);

-- Paid_orders table (derived table for paid orders)
CREATE TABLE paid_orders (
    order_id BIGINT PRIMARY KEY,
    bill_no BIGINT NOT NULL,
    customer_review VARCHAR(1000),
    total_amount BIGINT NOT NULL,
    FOREIGN KEY (order_id) REFERENCES `order`(order_id)
);

-- Create indexes for better performance
CREATE INDEX idx_order_customer_id ON `order`(customer_id);
CREATE INDEX idx_order_status ON `order`(status);
CREATE INDEX idx_item_cat_id ON item(cat_id);
CREATE INDEX idx_item_subcat ON item(subcat);
CREATE INDEX idx_paid_orders_bill_no ON paid_orders(bill_no);