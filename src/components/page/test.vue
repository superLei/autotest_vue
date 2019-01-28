<template>
 <div>
    <b-card-group deck>
        <b-card header="featured"
                header-tag="header"
                footer="Card Footer"
                footer-tag="footer"
                title="Title">
            <p class="card-text">Header and footers using props.</p>
            <b-button href="#"
                      variant="primary">Go somewhere</b-button>
        </b-card>
            <b-card header="Default"
                class="text-center">
            <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </b-card>
    </b-card-group>
</div>
</template>
