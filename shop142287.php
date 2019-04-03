<html>
    <head>
        <title>Moja pierwsza strona w PHP</title>
        <?php 
            $db = new mysqli("localhost", "s", "s", "PHPdb142287");
            session_start();
        ?>
    </head>
    <body>
        <ul>
            <?php
                $result = $db->query("select * from products")

                ?>
                <?php foreach($result as $v) :?>
                    <li>
                        <form action="" method="POST">
                            <div name="name" ><?=$v["Name"] ?></div>
                            <div name="price"><?=$v["Price"] ?></div>
                            <input type="submit" name="addButton" value="Add to cart">
                        </form>
                    </li>
                <?php endforeach; ?> 

        </ul>
    </body>
</html>

<?php
    if(isset($_POST['addButton'])){
        echo $_POST["name"];
        echo ' ';
        echo $_POST["price"];
    }
?>